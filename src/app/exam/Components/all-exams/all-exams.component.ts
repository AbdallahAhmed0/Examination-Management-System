import { Router } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exam } from '../../Models/exam';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';

import * as XLSX from 'xlsx';
import { StorageService } from 'src/app/login/Services/storage.service';
import { CourseSharedServiceService } from 'src/app/Shared/course-shared-service.service';
import { Course } from 'src/app/course/course.model';
import { CourseService } from 'src/app/course/course.service';

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss'],
})
export class AllExamsComponent implements OnInit {
  displayedColumns: string[] = [
    'Actions',
    'id',
    'examName',
    'course',
    'showResult',
    'startTime',
    'endTime',
    'state',
    'duration',
    'successRate'
  ];
  dataSource!: MatTableDataSource<any>;

  exams!: Exam[];
  permissions: Object[] = [];
  permittedToAddExam: boolean = false;
  adminExams: Exam[] = [];
  courses:Course[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examService: ExamService,
    private router: Router,
    private dialog: MatDialog,
    private storageService: StorageService,
    private sharedCourseService: CourseSharedServiceService,
    private courseService:CourseService
  ) {}

  ngOnInit() {
    this.permissions = this.storageService.getUser().permissions;
    if (
      this.permissions.some(
        (role: any) => role.authority === 'MANAGE_EXAMS_ROLE'
      )
    ) {
    this.getExams();
    }else if (this.permissions.some(
      (role: any) => role.authority === 'MANAGE_ADMIN_EXAMS_ROLE'
    )) {
      this.getAdminExams();
    }

  }


  getAdminExams(){
    this.courseService.getCoursesByAdminId(this.storageService.getUser().userId).subscribe( courses => {
      for (let course of courses) {
        let courseId: number = course.id? course.id : 0;
      this.courseService.getExamsofCourse(courseId).subscribe(data=>{
          this.createTable(data);
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getExams() {
    this.examService.getAllExams().subscribe((data) => {
      this.createTable(data);
    });
  }
createTable(data:any){
  const createNewExam = (id: number) => {
    return {
      id: id,
      examName:
        data[Math.round(Math.random() * (data.length - 1))].examName,
      duration:
        data[Math.round(Math.random() * (data.length - 1))].duration,
      course: data[Math.round(Math.random() * (data.length - 1))].course,
      state: data[Math.round(Math.random() * (data.length - 1))].state,
      startTime:
        data[Math.round(Math.random() * (data.length - 1))].startTime,
      EndTime: data[Math.round(Math.random() * (data.length - 1))].endTime,
    };
  };

  // Create users

  const exam = Array.from({ length: length }, (_, k) =>
    createNewExam(k + 1)
  );

  // Assign the data to the data source for the table to render
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  this.exams = data;
}
  edit(id: number) {
    this.router.navigate(['exams/edit', id]);
  }

  delete(row: Exam) {
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.examService.deleteExam(row).subscribe((data)=>{
          window.location.reload();
          this.examService.openSnackBar('Deleted');
        })
      }
    });
  }

  add() {
    this.router.navigate(['exams/add']);
  }


  // // Send userId and examId then get response with user data
  // getAttemptExamData(rowId: number, userId: number) {
  //   this._examService
  //     .attemptExam(rowId, userId)
  //     .subscribe((data) => console.log(data));
  // }
  attemptExam(id: number){
    this.router.navigate(['exams/attempt/', id]);
  }

  exportData(){
    const headings = [
      'id',
      'examName',
      'duration',
      'startTime',
      'endTime',
      'successRate',
      'state',
      'questionsPerPage',
      'showResult',
      'course'
  ];
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exams);
  const headerStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { bgColor: { rgb: '2F75B5' } }
  };


  // add header row
  XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });


      // Set column width
      const columns = [{ wpx: 30 }, { wpx: 100 }, { wpx: 80 },{ wpx: 180 }, { wpx: 180 }, { wpx: 80 },{ wpx: 80 }, { wpx: 80 }, { wpx: 80 },{ wpx: 300 }];
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
      link.download = 'Data of Exams.xlsx';
      link.click();
      URL.revokeObjectURL(url);

  }

}
