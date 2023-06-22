import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Shared/material/material.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetCodeComponent } from './forget-code/forget-code.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    ForgetCodeComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],

})
export class LoginModule { }
