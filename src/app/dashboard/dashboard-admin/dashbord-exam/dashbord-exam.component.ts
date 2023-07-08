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
  isClosedExamsOpen = true;
  activeExams: Exam[] = [];
  upcomingExams: Exam[] = [];
  closedExams: Exam[] = [];
  displayedColumns: string[] = [
    'examName',
    'course',
    'duration',
    'successRate',
  ];
  dataSource: MatTableDataSource<Exam> = new MatTableDataSource<Exam>([]);
  activeExamsDataSource: MatTableDataSource<Exam> =
    new MatTableDataSource<Exam>([]);
  upcomingExamsDataSource: MatTableDataSource<Exam> =
    new MatTableDataSource<Exam>([]);
  closedExamsDataSource: MatTableDataSource<Exam> =
    new MatTableDataSource<Exam>([]);
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
        (role: any) => role.authority === 'DASHBOARD_ROLE'
      ) ||
      (
        this.permissions.some(
          (role: any) => role.authority === 'SHOW_ALL_EXAMS_ROLE'
        ) 
      )
    ) {
      this.getExams();
    }
  }

  toggleLiveExams() {
    this.isLiveExamsOpen = !this.isLiveExamsOpen;
  }

  toggleUpcomingExams() {
    this.isUpcomingExamsOpen = !this.isUpcomingExamsOpen;
  }
  toggleClosedExams() {
    this.isClosedExamsOpen = !this.isClosedExamsOpen;
  }

  getExams() {
    const currentDate = new Date();
    this.examService.getAllExams().subscribe(
      (data) => {
        data.forEach((exam) => {
          const startTime = new Date(exam.startTime);
          const endTime = new Date(exam.endTime);

          if (startTime <= currentDate && endTime >= currentDate) {
            // exam is active
            this.activeExams.push(exam);
          } else if (startTime > currentDate) {
            // exam is upcoming
            this.upcomingExams.push(exam);
          } else {
            // exam is closed
            this.closedExams.push(exam);
          }
        });

        this.configureDataSources(data);
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );
  }

  configureDataSources(data: Exam[]) {
    this.activeExamsDataSource.data = this.activeExams;
    this.upcomingExamsDataSource.data = this.upcomingExams;
    this.closedExamsDataSource.data = this.closedExams;

    const sortingDataAccessor = (data: Exam, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'examName':
          return data.examName;
        case 'course':
          return data.course.courseName;
        case 'duration':
          return data.duration;
        case 'successRate':
          return data.successRate;
        default:
          return '';
      }
    };

    this.activeExamsDataSource.sortingDataAccessor = sortingDataAccessor;
    this.upcomingExamsDataSource.sortingDataAccessor = sortingDataAccessor;
    this.closedExamsDataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.data = [
      ...this.activeExams,
      ...this.upcomingExams,
      ...this.closedExams,
    ];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.exams = data;
  }
}
