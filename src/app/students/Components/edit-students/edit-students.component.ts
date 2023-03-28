import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from './../../Models/student';
import { StudentsService } from '../../Services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/roles/Models/role';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss'],
})
export class EditStudentsComponent implements OnInit {
  hide = true;

  student: Student = {} as Student;
  newStudent!: FormGroup;
  EditStudent!: Student;
  checkRole: any[] = [];
  id!: number;
  roleView!: Role[];

  consoleError: any;
  subStudent?: Subscription;
  subRoute?: Subscription;

  theGroups:any;

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGroups();

    this.subRoute = this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id'));

      this.studentsService.getStudentById(this.id).subscribe((data) => {
        this.student = data;
        this.roleView = this.student.roles;
        this.checkRole = this.roleView;
        this.newStudent = this.fb.group({
          firstName: [
            data.firstName,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20),
            ],
          ],
          lastName: [
            data.lastName,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20),
            ],
          ],
          universityId: [data.universityId, [Validators.required]],
          email: [data.email, [Validators.required, Validators.email]],
          password: [
            data.password,
            [Validators.required, Validators.minLength(6)],
          ],
          roles: this.fb.array([]),
          locked: [data.locked],
          enable: [data.enable],
          group: [data.group,[Validators.required]]

        });

      });
    });
  }

  editStudent(id: number) {
    const observer = {
      next: (student: Student) => {
        this.router.navigateByUrl('/students');
        this.studentsService.openSnackBar('Updated');
      },
      error: (err: Error) => {
        this.consoleError = err.message;
      },
    };

    let testformArray = this.newStudent.get('roles') as FormArray;
    for (let i of this.checkRole) {
      testformArray.push(new FormControl(i));
    }

    this.EditStudent = this.newStudent.value;
    this.EditStudent.id = this.id;

    this.subStudent = this.studentsService
      .updateStudents(this.EditStudent)
      .subscribe(observer);
  }

  selectedRole(role: any[]) {
    this.checkRole = role;
  }
  getGroups(){
    this.studentsService.getGroups().subscribe(data=>{
      this.theGroups=data
    })
  }
  goback() {
    this.router.navigate(['students']);
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
    this.subRoute?.unsubscribe();
  }
}
