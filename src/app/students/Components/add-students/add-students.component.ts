
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router'
import {Students} from './../../Models/student'
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
})
export class AddStudentsComponent implements OnInit {

  hide = true;

  newStudent!: FormGroup;
  roles!: string[];

  constructor(
    private StudentsService:StudentsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newStudent = this.fb.group({
            firstName: ['',Validators.required, Validators.minLength(3),Validators.maxLength(20)],
            lastName:['',Validators.required, Validators.minLength(3),Validators.maxLength(20)],
            universityId: ['',Validators.required],
            email: ['',Validators.required, Validators.email],
            role: this.fb.array([]),
            password:[''],
            specialization:['',Validators.required],
            enable:[true],
            locked:[false]

          })
console.log(this.roles);
  }

  goBack(){
    this.router.navigate(['students'])
  }

  addStudent(){
    const observer = {
      next: (student:Students) => {
        alert("Student Added Successfuly");
        this.router.navigateByUrl('/students');
      },
      error: (err:Error)=>{alert(err.message)}
    }
  }

  get firstName() {
    return this.newStudent.get('firstName');
  }
  get lastName() {
    return this.newStudent.get('lastName');
  }
  get universityId() {
    return this.newStudent.get('universityId');
  }
  get email() {
    return this.newStudent.get('email');
  }
  get password() {
    return this.newStudent.get('password');
  }
  get role() {
    return this.newStudent.get('role');
  }
  get specialization(){
    return this.newStudent.get('specialization');
  }
  get enable(){
    return this.newStudent.get('enable');
  }
}
