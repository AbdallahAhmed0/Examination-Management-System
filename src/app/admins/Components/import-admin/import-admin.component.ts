import { Component, OnInit } from '@angular/core';
import { Admin } from '../../Models/admin';
import { read, utils, writeFile } from 'xlsx';
import { Router } from '@angular/router';
import { AdminsService } from '../../Services/admins.service';
import { Subscription } from 'rxjs';

import axios from 'axios';
import { Role } from 'src/app/roles/Models/role';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-import-admin',
  templateUrl: './import-admin.component.html',
  styleUrls: ['./import-admin.component.scss']
})
export class ImportAdminComponent implements OnInit {

  admins:any[]=[];
  consoleError:any='';
  subAdmin?:Subscription;

  newAdmin!: FormGroup;

  constructor(private router:Router,
              private adminService:AdminsService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.newAdmin = this.fb.group({
      id:[],
      firstName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      lastName:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      universityId: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      roles: this.fb.array([]),
      password:['',[Validators.required]],
      specialization:['',[Validators.required]],
      enable:[true],
      locked:[false]

    })
  }
  goback(){
    this.router.navigate(['admins'])
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
                  const rows:any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                  this.admins = rows;
              }
          }
          reader.readAsArrayBuffer(file);
      }
  }
  importAdmin(){

    this.admins.map((admin) => {
      if (typeof admin.roles === 'string') { // check if roles is a string
        const rolesArray: any[] = admin.roles.split(',');
        const roles = rolesArray.map((role) => ({ role }));
        admin.roles = roles;
      }
    });
for(let admin of this.admins){

  this.newAdmin.patchValue(admin);

  if(this.newAdmin.valid){

  this.subAdmin = this.adminService.addAdmin(this.newAdmin.value).subscribe({
    next: (admin: Admin) => {
    },
    error: (err: Error) => {
      this.consoleError = `this record of admin id = ${admin.id} contian this error: ${err.message}`;

    }
  });
}
else{

  if(this.firstName?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: First Name is Required `;

  else if((this.firstName?.hasError('minlength')))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: First Name should be at least 3 characters! `;

  else if((this.firstName?.hasError('maxlength')))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: First Name should be at more 20 characters! `;

  else if(this.lastName?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Last Name is Required `;

  else if((this.lastName?.hasError('minlength')))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Last Name should be at least 3 characters! `;

  else if((this.lastName?.hasError('maxlength')))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Last Name should be at more 20 characters! `;

  else if(this.email?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Email is Required `;

  else if(this.email?.hasError('email'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Email is not Vaild `;

  else if(this.universityId?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: universityId is Required `;

  else if(this.password?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: password is Required `;

  else if(this.specialization?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: specialization is Required `;

  else if(this.role?.hasError('required'))
  this.consoleError=`this record of admin id = ${admin.id} contian this error: Role is Required `;
}
if(this.consoleError!== ''){
  stop;
  this.consoleError=='';
}
  }
  if(this.consoleError==''){
  this.router.navigate(['/admins']);
  this.adminService.openSnackBar('Added')
  }
  }
  get firstName() {
    return this.newAdmin.get('firstName');
  }
  get lastName() {
    return this.newAdmin.get('lastName');
  }
  get universityId() {
    return this.newAdmin.get('universityId');
  }
  get email() {
    return this.newAdmin.get('email');
  }
  get password() {
    return this.newAdmin.get('password');
  }
  get role() {
    return this.newAdmin.get('roles');
  }
  get specialization(){
    return this.newAdmin.get('specialization');
  }
  get enable(){
    return this.newAdmin.get('enable');
  }
  ngOnDestroy(): void {
  this.subAdmin?.unsubscribe()
  }
}
