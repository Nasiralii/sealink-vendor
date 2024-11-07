import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-vender-login',
  templateUrl: './vender-login.component.html',
  styleUrls: ['./vender-login.component.scss']
})
export class VenderLoginComponent {

  formGroup: FormGroup | undefined;
  carouselData = [
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' }
  ];
    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }
}
