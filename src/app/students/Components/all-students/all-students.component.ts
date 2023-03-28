import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogeComponent } from 'src/app/Shared/material/dialog/dialog.component';
import { utils, writeFile } from 'xlsx';
import { Student } from '../../Models/student';
import { StudentsService } from '../../Services/students.service';


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
  exportData() {
    const headings = [
      [
        'id',
        'firstName',
        'lastName',
        'universityId',
        'email',
        'password',
        'role',
        'locked',
        'enable',
        'groups',
      ],
    ];

    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.students, { origin: 'A2', skipHeader: true });
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

  importData() {
    this.router.navigate(['students/import']);
  }
}
