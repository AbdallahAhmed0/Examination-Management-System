import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetCodeComponent } from './forget-code/forget-code.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"forgetcode",component:ForgetCodeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
