import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService} from '../Services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  permissions: Object[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.permissions = this.storageService.getUser().permissions;
    }
  }

  onSubmit() {
    this.authenticationService
      .login(this.email?.value, this.password?.value)
      .subscribe({
        next: (response) => {
          // reset error
          this.errorMessage = '';
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(response.token);

          this.storageService.saveUser(decodedToken, response);
          this.permissions = decodedToken.permissions;
          console.log(response.token);
          if (
            this.permissions.some(
              (role: any) => role.authority === 'DASHBOARD_ROLE'
            )
          ) {
            this.router.navigate(['/dashboard']);
          } else if (
            this.permissions.some(
              (role: any) => role.authority === 'SHOW_COURSE_OF_GROUP_ROLE'
            )
          ) {
            this.router.navigate(['/courses']);
          }
          this.isLoginFailed = false;
          this.isLoggedIn = true;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoginFailed = true;
        },
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get Permissions() {
    return this.permissions;
  }
}
