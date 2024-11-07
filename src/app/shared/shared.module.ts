import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { SharedService } from './services/shared.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';

import { OnlyNumberDirective } from './directives/only-number.directive';
import { CostDirective } from './directives/cost.directive';

@NgModule({
  declarations: [
    ErrorComponent,
    ConfirmationComponent,
    OnlyNumberDirective,
    CostDirective,
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule
  ],
  exports: [
    ErrorComponent,
    ConfirmationComponent,
    OnlyNumberDirective,
    CostDirective
  ],
  providers:[
    {    
      provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptor,
      multi:true
    },
    SharedService
  ]
})

export class SharedModule { }
