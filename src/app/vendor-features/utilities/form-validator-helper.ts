import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export class FormValidatorHelper {
    static documentArrayValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!(control instanceof FormArray)) {
                return null; // Not a FormArray, so no validation
            }

            const invalidDocuments = control.controls.some((docControl) => {
                const base64data = docControl.get('DocumentBase64')?.value;
                return !base64data;
            });

            return invalidDocuments ? { invalidDocuments: true } : null;
        };
    }
}