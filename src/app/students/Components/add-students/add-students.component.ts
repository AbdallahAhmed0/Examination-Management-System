import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Students } from './../../Models/student';
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  hide = true;
  newStudent!: FormGroup;
  checkRole: any[] = [];

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
      roles: this.fb.array(this.checkRole),
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
      },
      error: (err: Error) => {
        alert(err.message);
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
    console.log(this.newStudent.value)
  }

  goBack() {
    this.router.navigate(['students']);
  }

  selectedRole(role: any[]) {
    this.checkRole = role;
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
  get year() {
    return this.newStudent.get('year');
  }
  get enable() {
    return this.newStudent.get('enable');
  }
}
