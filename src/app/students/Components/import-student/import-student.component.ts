import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { read, utils } from 'xlsx';

import * as XLSX from 'xlsx';
import { StudentsService } from '../../Services/students.service';
import { Student } from '../../Models/student';
import { RolesService } from 'src/app/roles/Services/roles.service';
import { Role } from 'src/app/roles/Models/role';
@Component({
  selector: 'app-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss']
})
export class ImportStudentComponent implements OnInit {

  newStudent!: FormGroup;
  students!: any[];
  subAdmin!: Subscription;
  consoleError: any[]=[];

  theGroups:any;
  Roles!:Role[];

  constructor(
    private fb: FormBuilder,
    private studentService:StudentsService,
    private rolesService:RolesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getGroups();
    this.getRoles();

    this.newStudent = this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      universityId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      roles: this.fb.array([]),
      locked: [false],
      enable: [true],
      group: [, [Validators.required]]
    });
  }

  goback() {
    this.router.navigate(['students']);
  }
  getGroups(){
    this.studentService.getGroups().subscribe(data=>{
      this.theGroups=data;
      })
    }
  getRoles(){
    this.rolesService.getRoles().subscribe(data =>{
        this.Roles=data;
      })
    }
  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.students = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }

  }
  exportData(){
    const headings = [
      'id',
      'firstName',
      'lastName',
      'universityId',
      'email',
      'password',
      'roles',
      'locked',
      'enable',
      'group'
  ];// (role Must be Match roles of system)
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
    ['','Hassan','Ahmed',152,'Hassan@email.com','Hassan4512','STUDENT,ADMIN',false,true,'Group_1'],
    ['','Wael','Hany',106,'Wael@email.com','#@$5^#$7+#$%','STUDENT,ASSISTANT',false,true,'Group_2']
]);


  // add header row
  XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });


      // Set column width
      const columns = [{ wpx: 30 }, { wpx: 100 }, { wpx: 100 },{ wpx: 80 }, { wpx: 180 }, { wpx: 150 },{ wpx: 150 }, { wpx: 70 }, { wpx: 70 },{ wpx: 120 }];
      ws['!cols'] = columns;

      // Set row height
      const rows = [{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 }];
      ws['!rows'] = rows;



      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sample Data of students.xlsx';
      link.click();
      URL.revokeObjectURL(url);

  }
  importStudent() {

    this.consoleError=[];
    this.students.map((student) => {
        if (typeof student.roles === 'string') { // check if roles is a string
          const rolesArray: string[] = student.roles.split(',');
          let rolesObj=[];
            for(let myRole of rolesArray){
              for( let role of this.Roles){
                if(myRole == role.role){
                  rolesObj.push(role)
                }
            }
          }
          student.roles = rolesObj ;
          }

        for( let Group of this.theGroups){
          if(student.group == Group.name){
            student.group = Group ;
          }
      }
      if (typeof student.group === 'string') { // check if roles is a string
        student.group = this.theGroups[0] ;
      }
    });

    const length =this.students.length;
    for (let i = 0;i < length;i++) {
      let student = this.students[i];
      this.newStudent.patchValue(student);
      const observer = {
        next: (student: Student) => {},
        error: (err: Error) => {
          this.consoleError.push(`This student with record number ${i+1}, ${err.message}`);
        },
      };

      if(this.newStudent.valid){
        this.subAdmin = this.studentService.addStudent(this.newStudent.value).subscribe(observer);
      }
      else{
        if(this.firstName?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, First Name is Reqiured`);
        }
        else if(this.firstName?.hasError('minlength')){
          this.consoleError.push(`This student with record number ${i+1}, First Name should be at least 3 characters!`);
        }
        else if(this.firstName?.hasError('maxlength')){
          this.consoleError.push(`This student with record number ${i+1}, First Name should be at max 20 characters!`);
        }
        else if(this.lastName?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, Last Name is Reqiured`);
        }
        else if(this.lastName?.hasError('minlength')){
          this.consoleError.push(`This student with record number ${i+1}, Last Name should be at least 3 characters!`);
        }
        else if(this.lastName?.hasError('maxlength')){
          this.consoleError.push(`This student with record number ${i+1}, Last Name should be at max 20 characters!`);
        }
        else if(this.email?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, Email is Required!`);
        }
        else if(this.email?.hasError('email')){
          this.consoleError.push(`This student with record number ${i+1}, Email is not Vaild!`);
        }
        else if(this.password?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, password is not Vaild!`);
        }
        else if(this.universityId?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, UniversityId is Required!`);
        }
        else if(this.group?.hasError('required')){
          this.consoleError.push(`This student with record number ${i+1}, group is Required!`);
        }
      }
    }

  // use setTimeout because when deplicated email server take some time
  setTimeout(() => {
    if(!this.consoleError.length){
        this.router.navigate(['/students']);
        this.studentService.openSnackBar('Added');
    }
  }, 1000);


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
}
