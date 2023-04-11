import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogeComponent } from 'src/app/Shared/material/dialog/dialog.component';
import { Student } from '../../Models/student';
import { StudentsService } from '../../Services/students.service';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
})
export class AllStudentsComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'universityId',
    'group',
    'enable',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  students!: Student[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.getStudents();
  }

  ngOnInit(): void {
    this.getStudents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['students/edit', id]);
  }
  delete(id: number) {
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height:'280px'
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

          this.studentService.deleteStudent(id);
        }
        window.location.reload();

      });

  }
  add() {
    this.router.navigate(['students/add']);
  }

  getStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      /** Builds and returns a new User. */
      const createNewStudent = (id: number) => {
        return {
          id: id,
          firstName:
            data[Math.round(Math.random() * (data.length - 1))].firstName,
          lastName:
            data[Math.round(Math.random() * (data.length - 1))].lastName,
          universityId:
            data[Math.round(Math.random() * (data.length - 1))].universityId,
          email: data[Math.round(Math.random() * (data.length - 1))].email,
          group: data[Math.round(Math.random() * (data.length - 1))].group,
        };
      };

      // Create users

      const student = Array.from({ length: length }, (_, k) =>
        createNewStudent(k + 1)
      );

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.students = data;
    });
  }
  exportData(){
    const headings = [
      'id',
      'First Name',
      'Last Name',
      'UniversityId',
      'Email',
      'Password',
      'Roles',
      'Locked',
      'Enable',
      'Group'
  ];
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.students.map(a => ({
    ...a,
    roles: a.roles.map(r => r.role).join(', '),
    group:a.group.name
  })));
  const headerStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { bgColor: { rgb: '2F75B5' } }
  };


  // add header row
  XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });


      // Set column width
      const columns = [{ wpx: 30 }, { wpx: 100 }, { wpx: 100 },{ wpx: 60 }, { wpx: 180 }, { wpx: 150 },{ wpx: 70 }, { wpx: 70 }, { wpx: 70 },{ wpx: 120 }];
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
      link.download = 'Data of Students.xlsx';
      link.click();
      URL.revokeObjectURL(url);

  }

  importData() {
    this.router.navigate(['students/import']);
  }
}
