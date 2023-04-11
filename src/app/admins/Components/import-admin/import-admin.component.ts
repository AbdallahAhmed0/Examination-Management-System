import { Component, OnInit } from '@angular/core';
import { Admin } from '../../Models/admin';
import { read, utils, writeFile } from 'xlsx';
import { Router } from '@angular/router';
import { AdminsService } from '../../Services/admins.service';


@Component({
  selector: 'app-import-admin',
  templateUrl: './import-admin.component.html',
  styleUrls: ['./import-admin.component.scss']
})
export class ImportAdminComponent implements OnInit {

  admin!:Admin[];
  constructor(private router:Router,
              private adminService:AdminsService) { }

  ngOnInit(): void {
  }
  goback(){
    this.router.navigate(['admins'])
  }

  importAdmin(){
  this.router.navigate(['admins']);
  }
  admins:any;

  handleImport($event: any) {
      const files = $event.target.files;
      if (files.length) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event: any) => {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;

              if (sheets.length) {
                  const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                  this.admins = rows;
              }
          }
          reader.readAsArrayBuffer(file);
      }
  }

}
