import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { read, utils } from 'xlsx';
@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss']
})
export class ImportQuestionsComponent implements OnInit {

  newAdmin!: FormGroup;
  admins!: any[];
  subAdmin!: Subscription;
  consoleError!: string;

  constructor(
    private fb: FormBuilder,
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
    this.router.navigate(['exams']);
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



}
}
