import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor( private router: Router) {}
  ngOnInit(): void {
  }

  async login() {
    // try {
    //   await this.auth.signInWithEmailAndPassword(this.email, this.password);
    //   this.router.navigate(['/home']);
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
