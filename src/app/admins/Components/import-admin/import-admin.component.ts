import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { read, utils } from 'xlsx';
import { Admin } from '../../Models/admin';
import { AdminsService } from '../../Services/admins.service';

@Component({
  selector: 'app-import-admin',
  templateUrl: './import-admin.component.html',
  styleUrls: ['./import-admin.component.scss']
})
export class ImportAdminComponent implements OnInit {

  newAdmin!: FormGroup;
  admins!: any[];
  subAdmin!: Subscription;
  consoleError!: string;

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

  importAdmin() {
    this.admins.map((admin) => {
      if (typeof admin.roles === 'string') { // check if roles is a string
        const rolesArray: any[] = admin.roles.split(',');
        const roles = rolesArray.map((role) => ({ role }));
        admin.roles = roles;
      }
    });
    for (let admin of this.admins) {
      this.newAdmin.setValue(admin);

      const observer = {
        next: (admin: Admin) => {},
        error: (err: Error) => {
          this.consoleError = err.message;
        },
      };

      this.subAdmin = this.adminService.addAdmin(admin).subscribe(observer);
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
