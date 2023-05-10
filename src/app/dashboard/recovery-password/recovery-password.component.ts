import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  recoveryForm!: FormGroup;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    console.log(this.recoveryForm.value);

  }

  get email(){
     return this.recoveryForm.get('email')
  }
}









// <form #recorveryform="ngForm" [formGroup]="recoveryForm" (ngSubmit)="onSubmit()">
//   <h2>Password Recovery</h2>

//   <div class="form-group">
//     <label for="email">Email address</label>
//     <input type="email" class="form-control" id="email" formControlName="email">
//     <div *ngIf="email.hasError&& (email.dirty || email.touched)">
//       <small class="text-danger" *ngIf="email.hasError("required")">Email is required.</small>
//       <small class="text-danger" *ngIf="email.hasError("email")>Invalid email format.</small>
//     </div>
//   </div>

//   <button type="submit" class="btn btn-primary" [disabled]="recorveryform.invalid">Recover Password</button>
// </form>


// <form #recorveryform="ngForm" [formGroup]="recoveryForm" (ngSubmit)="onSubmit()">

//   <mat-form-field appearance="fill" >

//     <mat-label>Name</mat-label>
//     <input matInput formControlName="examName" minlength="3" maxlength="20"  required>

//     <mat-error *ngIf="email?.hasError('required')">
//       email is required
//     </mat-error>
//     <mat-error *ngIf="email?.hasError('email')">
//       email must be valid
//     </mat-error>

//   </mat-form-field>
//   <br>
//   <button mat-raised-button [disabled]="recorveryform.invalid" class="submit" type="submit">Submit</button>
//   </form>
