import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { utils, writeFile } from 'xlsx';
import { AdminsService } from '../../Services/admins.service';
import { Admin } from './../../Models/admin';


@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit,OnChanges  {

  displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'universityId','enable','specialization','actions'];
  dataSource!: MatTableDataSource<any>;

  admins!:Admin[];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService:AdminsService,
              private router:Router,
              public dialog: MatDialog) {


  }

  ngOnChanges(): void {
    this.getAdmins();
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

  this.adminService.deleteAdmin(id);
  alert('Deleted Successfully');
  window.location.reload();


}
add(){
  this.router.navigate(['admins/add']);
}

getAdmins(){

  this.adminService.getAllAdmins().subscribe(data =>{

    /** Builds and returns a new User. */
    const createNewAdmin =(id: number)=>{
          return {
            id: id,
            firstName: data[Math.round(Math.random() * (data.length - 1))].firstName,
            lastName: data[Math.round(Math.random() * (data.length - 1))].lastName,
            universityId: data[Math.round(Math.random() * (data.length - 1))].universityId,
            email: data[Math.round(Math.random() * (data.length - 1))].email,
            specialization: data[Math.round(Math.random() * (data.length - 1))].specialization,

          };
    }

        // Create users

        const admin = Array.from({length: length}, (_, k) => createNewAdmin(k + 1));

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.admins=data;

  })

}
exportData(){
  const headings = [[
    'id',
    'firstName',
    'lastName',
    'universityId',
    'email',
    'password',
    'role',
    'locked',
    'enable',
    'specialization'
]];

const wb = utils.book_new();
const ws: any = utils.json_to_sheet([]);
utils.sheet_add_aoa(ws, headings);
utils.sheet_add_json(ws, this.admins, { origin: 'A2', skipHeader: true });
utils.book_append_sheet(wb, ws, 'Report');
writeFile(wb, 'Data of Admins.xlsx');
}
//   let workbook = new Workbook();
//   let worksheet = workbook.addWorksheet('adminSheet');

//   worksheet.columns = [
//     { header: 'Id', key: 'id', width: 10 },
//     { header: 'First Name', key: 'firstName', width: 22 },
//     { header: 'Last Name', key: 'lastName', width: 22 },
//     { header: 'Email', key: 'email', width: 28 },
//     { header: 'University Id', key: 'universityId', width: 15 },
//     { header: 'enable', key: 'enable', width: 15 },
//     { header: 'Specialization', key: 'specialization', width: 25 },
//   ];

//   this.admins.forEach(e => {
//     worksheet.addRow({id: e.id, firstName: e.firstName,lastName: e.lastName,
//         email:e.email, universityId:e.universityId, enable:e.enable,specialization:e.specialization },"n");
//   });

//   workbook.xlsx.writeBuffer().then((data) => {
//     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     // saveAs(blob, 'Data of Admins.xlsx');
//   })
// }

importData(){
  this.router.navigate(['admins/import']);
}
}


