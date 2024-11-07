import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorAuthService } from '../../services/vendor-auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { VendorLoginModel } from '../../models/vendor-login-model';
@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss'],
})
export class VendorLoginComponent {

  loginForm: FormGroup | undefined;
  constructor(private fb: FormBuilder,
    private router: Router,
    private apiService: VendorAuthService,
    private message: MessageService,
    private storage: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      passKey: ['', Validators.required]
    });
  }

  carouselData = [
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' },
    { title: 'Transform Cool Data', desc: 'Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.' }
  ];

  ngOnInit() {   }
  signIn() {
    // this.nextSubmitted = true;
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('passKey')?.value;

    //contains json object
    const data: VendorLoginModel = {
      Email: email,
      PassKey: password
    }

    this.apiService.login(data).subscribe((res) => {
      // console.log(res);
      if (res.statusCode === 'SB000') {

        this.storage.store('accessToken', res.data.accessToken)

        this.storage.store('refreshToken', res.data.refreshToken)

        this.storage.store('userInfo', res.data.userInfo[0]);
        // this.storage.store('activeCompany', res.data.userInfo[0]?.defaultCompanyUID);
        // this.sharedService.setCompanyUid({ activeCompany: res.data.userInfo[0]?.defaultCompanyUID })
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Login successful' })

        setTimeout(() => {
          if (this.storage.retrieve('userInfo')['vesselUID']) {
            this.router.navigate(['/vendor'],
              { queryParams: { menu_id: 104, f_id: 501, action: 701 } });
          } else {
            this.router.navigate(['/vendor'],
              { queryParams: { menu_id: 101, f_id: 501, action: 701 } });
          }
        }, 1000)
      } else {
        this.message.add({ severity: 'error', summary: 'Alert', detail: 'The credentials do not match. Please try again.' })
      }
    });
  }
}
