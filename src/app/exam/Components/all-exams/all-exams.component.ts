import { Router } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exam } from '../../Models/exam';

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss'],
})
export class AllExamsComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'examName',
    'examDate',
    'duration',
    'startTime',
    'endTime',
  ];
  dataSource!: MatTableDataSource<any>;

  subExam?: Subscription;
  exams!: Exam[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {
    this.getexams();
    console.log();
  }

  ngOnChanges(): void {
    this.getexams();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getexams() {
    this.subExam = this.examService.getAllExams().subscribe((data) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.exams = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['exams/edit', id]);
  }

  delete(id: number) {
    this.examService.deleteExam(id);
    alert('Deleted Successfully');
    window.location.reload();
  }

  add() {
    this.router.navigate(['exams/add']);
  }

  ngOnDestroy(): void {
    this.subExam?.unsubscribe();
  }
}
