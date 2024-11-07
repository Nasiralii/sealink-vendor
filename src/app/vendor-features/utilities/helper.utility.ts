import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export class HelperUtility {
    static removeTrailingSlash(str: string): string {
        return str.endsWith('/') ? str.slice(0, -1) : str;
    }

    static getFormErrors(frm: FormGroup): string[] {
        const collectGroupErrors = (group: FormGroup, parentKey: string): string[] => {
            return Object.keys(group.controls).flatMap(key => {
                const control = group.get(key);
                return control instanceof FormGroup
                    ? collectGroupErrors(control, `${parentKey}.${key}`)
                    : control?.errors ? collectControlErrors(control, `${parentKey}.${key}`) : [];
            });
        }

        const collectControlErrors = (control: AbstractControl, controlName: string): string[] => {
            return Object.keys(control.errors).map(errorKey => `${controlName} is invalid: ${errorKey}`);
        }

        const collectArrayErrors = (array: FormArray, parentKey: string): string[] => {
            const errors: string[] = [];

            // Iterate over each control in the FormArray
            array.controls.forEach((control, index) => {
                if (control instanceof FormGroup) {
                    errors.push(...collectGroupErrors(control, `${parentKey}[${index}]`));
                } else if (control?.errors) {
                    errors.push(...collectControlErrors(control, `${parentKey}[${index}]`));
                }
            });

            return errors;
        }

        const errors: string[] = [];

        // Iterate through each control in the form group
        Object.keys(frm.controls).forEach(key => {
            const control = frm.get(key);
            if (control instanceof FormGroup) {
                errors.push(...collectGroupErrors(control, key));
            } else if (control instanceof FormArray) {
                errors.push(...collectArrayErrors(control, key))
            }
            else if (control?.errors) {
                errors.push(...collectControlErrors(control, key));
            }
        });

        return errors;
    }
}

