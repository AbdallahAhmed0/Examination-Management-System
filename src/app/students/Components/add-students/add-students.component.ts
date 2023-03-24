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
import { Student } from './../../Models/student';
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

  theGroups:any;

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGroups();

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
      locked: [false],
      enable: [true],
      group: this.fb.group({
        id:[],
        name:['',[Validators.required]]
      }),
    });
  }

  addStudent() {
    const observer = {
      next: (student: Student) => {
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
  getGroups(){
    this.studentsService.getGroups().subscribe(data=>{

      this.theGroups=data

    })
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
    return this.newStudent.get('roles');
  }
  get group() {
    return this.newStudent.get('group');
  }
  get enable() {
    return this.newStudent.get('enable');
  }

  ngOnDestroy(): void {
    this.subStudent?.unsubscribe();
  }
}
