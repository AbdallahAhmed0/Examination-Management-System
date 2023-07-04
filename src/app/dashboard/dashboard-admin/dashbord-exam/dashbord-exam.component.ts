import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/exam/Models/exam';
import { ExamService } from 'src/app/exam/Services/exam.service';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';

@Component({
  selector: 'app-dashbord-exam',
  templateUrl: './dashbord-exam.component.html',
  styleUrls: ['./dashbord-exam.component.scss'],
})
export class DashbordExamComponent implements OnInit {
  isLiveExamsOpen = true;
  isUpcomingExamsOpen = true;
  no = 0;
  visibleExams: Exam[] = [];
  displayedColumns: string[] = [
    // 'id',
    'examName',
    'course',
    'duration',
    // 'state',
    'successRate',
  ];
  dataSource!: MatTableDataSource<any>;
  exams!: Exam[];
  permissions: Object[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examService: ExamService,
    private storageService: StorageServiceService
  ) {}

  ngOnInit(): void {
    this.permissions = this.storageService.getUser().permissions;
    if (
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_EXAMS_LIST_ROLE'
      )
    ) {
      this.getExams();
      this.no++;
    }
  }

  toggleLiveExams() {
    this.isLiveExamsOpen = !this.isLiveExamsOpen;
  }

  toggleUpcomingExams() {
    this.isUpcomingExamsOpen = !this.isUpcomingExamsOpen;
  }

  getExams() {
    this.examService.getAllExams().subscribe((data) => {
      /** Builds and returns a new User. */
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

      const activeExams = data.filter((exam) => exam.state);

      // Create users
      const exam = Array.from({ length: length }, (_, k) =>
        createNewExam(k + 1)
      );

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.exams = data;

      console.log(data);
    });
  }
}
