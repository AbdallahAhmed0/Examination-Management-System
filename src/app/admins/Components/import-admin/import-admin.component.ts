import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { read, utils } from 'xlsx';
import { Admin } from '../../Models/admin';
import { AdminsService } from '../../Services/admins.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-admin',
  templateUrl: './import-admin.component.html',
  styleUrls: ['./import-admin.component.scss']
})
export class ImportAdminComponent implements OnInit {

  newAdmin!: FormGroup;
  admins!: any[];
  subAdmin!: Subscription;
  consoleError: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newAdmin = this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      universityId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roles: this.fb.array([]),
      password: [''],
      specialization: ['', [Validators.required]],
      enable: [true],
      locked: [false]
    });
  }

  goback() {
    this.router.navigate(['admins']);
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
          this.admins = rows;
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
      'specialization'
  ];
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
    ['','Ahmed','Hossam',12,'Ahmed@email.com','Ahmed123865','ADMIN',false,true,'Software Engineer'],
    ['','Adel','Hany',16,'Adel@email.com','#@$5^#$7+#$%','ADMIN',false,true,'Machine learning']
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
      link.download = 'Sample Data of admins.xlsx';
      link.click();
      URL.revokeObjectURL(url);

  }
  importAdmin() {
    this.admins.map((admin) => {
      if (typeof admin.roles === 'string') { // check if roles is a string
        const rolesArray: any[] = admin.roles.split(',');
        const roles = rolesArray.map((role) => ({ role }));
        admin.roles = roles;
      }
    });

    for (let admin of this.admins) {
      let i = 1;
      this.newAdmin.patchValue(admin);

      const observer = {
        next: (admin: Admin) => {},
        error: (err: Error) => {
          this.consoleError =`This admin of of record number ${--i}, ${err.message}`;

        },
      };

      if(this.newAdmin.valid){
        this.subAdmin = this.adminService.addAdmin(this.newAdmin.value).subscribe(observer);
        ++i;
      }
      else{
        if(this.firstName?.hasError('required')){
          this.consoleError=`This admin of record number ${i}, First Name is Reqiured`;
        }
        else if(this.firstName?.hasError('minlength')){
          this.consoleError=`This admin of of record number ${i}, First Name should be at least 3 characters!`;
        }
        else if(this.firstName?.hasError('maxlength')){
          this.consoleError=`This admin of record number ${i}, First Name should be at max 20 characters!`;
        }
        else if(this.lastName?.hasError('required')){
          this.consoleError=`This admin of record number ${i}, Last Name is Reqiured`;
        }
        else if(this.lastName?.hasError('minlength')){
          this.consoleError=`This admin of record number ${i}, Last Name should be at least 3 characters!`;
        }
        else if(this.lastName?.hasError('maxlength')){
          this.consoleError=`This admin of record number ${i}, Last Name should be at max 20 characters!`;
        }
        else if(this.email?.hasError('required')){
          this.consoleError=`This admin of record number ${i}, Email is Required!`;
        }
        else if(this.email?.hasError('email')){
          this.consoleError=`This admin of record number ${i}, Email is not Vaild!`;
        }
        else if(this.password?.hasError('required')){
          this.consoleError=`This admin of record number ${i}, password is not Vaild!`;
        }
        else if(this.universityId?.hasError('required')){
          this.consoleError=`This admin of of record number ${i}, UniversityId is Required!`;
        }
        else if(this.specialization?.hasError('required')){
          this.consoleError=`This admin of of record number ${i}, specialization is Required!`;
        }

      }
    }
    if(!this.consoleError){
      this.router.navigate(['/admins']);
      this.adminService.openSnackBar('Added');
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

  get roles() {
    return this.newAdmin.get('roles') as FormArray;
  }

  get specialization() {
    return this.newAdmin.get('specialization');
  }

  get enable() {
    return this.newAdmin.get('enable');
  }

}
