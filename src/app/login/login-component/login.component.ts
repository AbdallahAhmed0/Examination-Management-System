import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { first } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hidePassword: boolean = true;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService) {

    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required,Validators.email]],
          password: ['', [Validators.required]]
      });
  }


  onSubmit() {

      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.email?.value, this.password?.value)
          .subscribe({
              next: (response) => {
                const helper = new JwtHelperService();
                const decodedToken = helper.decodeToken(response.token);

                console.log(decodedToken); // Output the decoded token object

                  // get return url from query parameters or default to home page
                  //write route by role

                  // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  // this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
get email(){
  return this.loginForm.get('email');
}
get password(){
  return this.loginForm.get('password');
}
}
