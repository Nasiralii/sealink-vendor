import { Component } from "@angular/core";
import { DropdownFilterOptions } from "primeng/dropdown";
import { environment } from "src/environments/environment";
interface City {
    name: string;
    code: string;
}

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
    versionNo: any = `${environment.versionNumber}`;
    currentYear: any = new Date().getFullYear();
    countries: City[] | undefined;

    selectedCountry: string | undefined;

    filterValue: string | undefined = "";

    ngOnInit() {
        this.countries = [
            { name: "Australia", code: "AU" },
            { name: "Brazil", code: "BR" },
            { name: "China", code: "CN" },
            { name: "Egypt", code: "EG" },
            { name: "France", code: "FR" },
            { name: "Germany", code: "DE" },
            { name: "India", code: "IN" },
            { name: "Japan", code: "JP" },
            { name: "Spain", code: "ES" },
            { name: "United States", code: "US" },
        ];
    }

    resetFunction(options: DropdownFilterOptions) {
        options.reset();
        this.filterValue = "";
    }

    customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
        options.filter(event);
    }
}
