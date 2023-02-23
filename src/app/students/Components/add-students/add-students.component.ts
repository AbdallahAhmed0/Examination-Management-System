<<<<<<< HEAD
import { Subscription } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Students } from './../../Models/student';
=======

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router'
import {Students} from './../../Models/student'
>>>>>>> 662301a7e5a746bdc8b06218950d2c96b3009c74
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  hide = true;
  consoleError: any;
  newStudent!: FormGroup;
  checkRole: any[] = [];
  subStudent?: Subscription;

<<<<<<< HEAD
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newStudent = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      universityId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      roles: this.fb.array([]),
      enable: [true],
      locked: [false],
      year: [, [Validators.required]],
    });
  }

  addStudent() {
    const observer = {
      next: (student: Students) => {
        alert('Student Added Successfuly');
        this.router.navigateByUrl('/students');
        this.studentsService.openSnackBar('Added');
      },
      error: (err: Error) => {
        this.consoleError = err.message;
      },
    };
    let testformArray = this.newStudent.get('roles') as FormArray;
    for (let i of this.checkRole) {
      testformArray.push(new FormControl(i));
    }
    if (this.password?.value == '') {
      this.password?.setValue(
        `${this.firstName?.value}${this.lastName?.value}${this.universityId?.value}`
      );
    }
    this.studentsService.addStudent(this.newStudent.value).subscribe(observer);
    console.log(this.newStudent.value);
  }

  goBack() {
    this.router.navigate(['students']);
  }

  selectedRole(role: any[]) {
    this.checkRole = role;
  }

=======
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

>>>>>>> 662301a7e5a746bdc8b06218950d2c96b3009c74
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
<<<<<<< HEAD
    return this.newStudent.get('roles');
  }
  get year() {
    return this.newStudent.get('year');
  }
  get enable() {
    return this.newStudent.get('enable');
  }

  ngOnDestroy(): void {
    this.subStudent?.unsubscribe();
  }
=======
    return this.newStudent.get('role');
  }
  get specialization(){
    return this.newStudent.get('specialization');
  }
  get enable(){
    return this.newStudent.get('enable');
  }
>>>>>>> 662301a7e5a746bdc8b06218950d2c96b3009c74
}
