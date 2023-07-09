import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-code',
  templateUrl: './forget-code.component.html',
  styleUrls: ['./forget-code.component.scss']
})
export class ForgetCodeComponent implements OnInit {
  passwordForm!:FormGroup


  constructor(private router:Router,
     private fb:FormBuilder,
     ) { }

     ngOnInit() {
      this.passwordForm = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
    }
  submitForm(){
    if (this.passwordForm.valid) {
      console.log('Form submitted!');
    } else {
      console.log('Form is invalid!');
    }


  }
  passwordsDoNotMatch() {
    const passwordControl = this.passwordForm.get('password');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password !== confirmPassword ? null : { passwordsDoNotMatch: true };
    }

    return null;
  }


  passwordMatchValidator(control: AbstractControl) {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { passwordsDoNotMatch: true };
    }

    return null;
  }






}
