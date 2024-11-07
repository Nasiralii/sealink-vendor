import { Component } from "@angular/core";
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: "app-dashboard-vender",
    templateUrl: "./dashboard-vender.component.html",
    styleUrls: ["./dashboard-vender.component.scss"],
})
export class DashboardVenderComponent {
    product = [{}];
    product2 = [{}];
    product3 = [{}];
    product4 = [{}];
    product5 = [{}];
    product6 = [{}];
    product7 = [{}];
    
    showToggle: boolean = false;
    isArowDown: boolean = false;
    first2 = 0;
    value: string;
    rows2 = 10;
    firstAsset = 0;
    rowsAsset = 10;
    activeIndex: number = 0;
    currentStepIndex: number = 0;

    constructor(private messageService: MessageService,) {
        
    }

    handleToggle() {
        this.showToggle = !this.showToggle;
        this.isArowDown = !this.isArowDown;
    }

    onPageChange2(event: any) {
        this.first2 = event.first;
        this.rows2 = event.rows;
    }

        items: any[] = [
            { label: 'Step 1', content: 'Content for Step 1' },
            { label: 'Step 2', content: 'Content for Step 2' },
            { label: 'Step 3', content: 'Content for Step 3' }
          ];

          onActiveIndexChange(event: number) {
            this.activeIndex = event;
        }
        goToNextStep() {
            if (this.activeIndex < this.items.length - 1) {
                this.activeIndex++;
                console.log("Navigating to next step:", this.activeIndex); // Debugging line
                this.messageService.add({
                    severity: "info",
                    detail: `${this.items[this.activeIndex].label}`,
                });
            }
        }
        goToPreviousStep() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
                console.log("Navigating to previous step:", this.activeIndex); // Debugging line
                this.messageService.add({
                    severity: "info",
                    summary: "Step Changed",
                    detail: `Moved to ${this.items[this.activeIndex].label}`,
                });
            }
        }


}
