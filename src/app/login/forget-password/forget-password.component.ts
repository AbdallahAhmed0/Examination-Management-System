import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailForm!:FormGroup

  constructor(private router:Router,
     private fb:FormBuilder,
     ) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  getCode(){
    this.router.navigateByUrl('/login/forgetcode');

  }


  get emailFormControl() {
    return this.emailForm.get('email');
  }

}
