import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageServiceService } from '../Services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles:string[]=['SHOW_COURSE_OF_GROUP_ROLE'];

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private storageService:StorageServiceService,
        private authenticationService: AuthService) {

    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required,Validators.email]],
          password: ['', [Validators.required]]
      });

      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        // this.roles = this.storageService.getUser().roles;
      }

  }


  onSubmit() {

      this.authenticationService.login(this.email?.value, this.password?.value)
          .subscribe({
              next: (response) => {
                // reset error
                this.errorMessage = '';
                const helper = new JwtHelperService();
                const decodedToken = helper.decodeToken(response.token);

                this.storageService.saveUser(decodedToken,response);

                console.log(this.storageService.getUser())
                if (this.roles.includes('SHOW_EXAMS_LIST_ROLE') || this.roles.includes('SHOW_EXAM_ROLE')) {
                  this.router.navigate(['/admins']);
                }else if(this.roles.includes('SHOW_COURSE_OF_GROUP_ROLE')){
                  this.router.navigate(['/courses']);
                }else{
                  // not logged in so redirect to login page with the return url
                  this.router.navigate(['/login']);
            }
                this.isLoginFailed = false;
                this.isLoggedIn = true;
              },
              error: err => {
                this.errorMessage = err.message;
                this.isLoginFailed = true;
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
