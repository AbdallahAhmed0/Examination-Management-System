import { Component,  OnInit, ViewChild,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from '../../Services/admins.service';
import { Admin } from './../../Models/admin';
import {DialogeComponent} from '../../../Shared/material/dialog/dialog.component';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'universityId','enable','specialization','actions'];
  dataSource!: MatTableDataSource<any>;

  subAdmin?:Subscription;
  admins!:Admin[];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService:AdminsService,
              private router:Router,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {

      this.getAdmins();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

edit(id:number){

  this.router.navigate(['admins/edit',id]);
}
delete(id:number){

  const dialogRef = this.dialog.open(DialogeComponent, {
    width: '400px',
    height:'280px'
    });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirm') {

        this.adminService.deleteAdmin(id);
      }
      window.location.reload();

    });

  }

add(){
  this.router.navigate(['admins/add']);
}

getAdmins(){

  this.subAdmin=this.adminService.getAllAdmins().subscribe(data =>{

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.admins=data;

  })

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
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.admins.map(a => ({
  ...a,
  roles: a.roles.map(r => r.role).join(', ')
})));
const headerStyle = {
  font: { bold: true, color: { rgb: 'FFFFFF' } },
  fill: { bgColor: { rgb: '2F75B5' } }
};


// add header row
XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });


    // Set column width
    const columns = [{ wpx: 30 }, { wpx: 100 }, { wpx: 100 },{ wpx: 80 }, { wpx: 180 }, { wpx: 150 },{ wpx: 70 }, { wpx: 70 }, { wpx: 70 },{ wpx: 120 }];
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
    link.download = 'Data of admins.xlsx';
    link.click();
    URL.revokeObjectURL(url);

}
importData(){
  this.router.navigate(['admins/import']);
}
ngOnDestroy(): void {
this.subAdmin?.unsubscribe();
}

}


