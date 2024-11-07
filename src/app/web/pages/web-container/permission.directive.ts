import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

import { PermissionService } from './permission.service';

@Directive({
    selector: '[appPermission]'
})
export class PermissionDirective {

    @Input() set appPermission(operation) {
        const hasPermission: boolean = this.checkPermission(operation);
        if (!hasPermission) {
            // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            //this.renderer.destroy();
        }
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private permissionService: PermissionService
        ) { }

        private checkPermission(operation): boolean {

            if(operation){
                if(operation.includes('_')){
                    const specialPermission = this.permissionService.specialPermissionData;
                    const operationData=(operation as string).split('_')[1];
                    const index = (specialPermission || []).findIndex(ele => ele.specialPermissionUniqueCode == operationData);
                    if (index > -1) {
                        if (specialPermission[index]['specialPermissionVisibility'] == 'Yes') {
                            return true;
                        }
                    }

                    return false;
                }else{
                    const specialPermission = this.permissionService.pagePermissionData;
                    if (specialPermission && specialPermission.length > 0 && specialPermission[0][operation] === "Yes") {
                        return true;
                    }
                    return false;
                }
            }
            return false;
        }

}

// <button [appPermission]="'write'">Write</button>
