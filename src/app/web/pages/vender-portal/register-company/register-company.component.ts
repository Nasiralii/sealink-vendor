import { Component } from '@angular/core';

interface Contact {
  name: string;
  code: string;
}
interface Currency {
  name: string;
  code: string;
}
interface Supply {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent {
  // type!: string;

  Contacts: Contact[] | undefined;

    selectedContact: Contact| undefined;

    selectedCurrency: Currency| undefined;
    selectedSupply: Supply| undefined;

    Currency: Currency[] | undefined;
    Supply: Supply[] | undefined;

    type: string = 'Company';
    individual : Boolean;
    company : Boolean = true;

    individualRegistration() {
      if(this.type = "Individual") {
this.individual = true;
this.company = false;
console.log(this.individual)
      }
    
    }

    companyRegistration (){
      if(this.type = "Company") {
        this.company = true;
        this.individual = false;
        console.log(this.company)
              }
    }

    ngOnInit() {
      this.Contacts = [
          { name: 'CC', code: 'NY' },
          { name: 'N/a', code: 'RM' },
      ];
      this.Currency = [
        { name: 'PKR', code: 'NY' },
        { name: 'USD', code: 'RM' },
    ];
    this.Supply = [
      { name: 'N/a', code: 'NY' },
      { name: 'N/a', code: 'RM' },
  ];
  }
}
