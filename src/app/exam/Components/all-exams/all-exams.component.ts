import { Router } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exam } from '../../Models/exam';
import { utils, writeFile } from 'xlsx';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss'],
})
export class AllExamsComponent implements OnInit {
  displayedColumns: string[] = [
    'actions',
    'id',
    'examName',
    'duration',
    'course',
    'status',
    'successRate',
    'startTime',
    'endTime'
  ];
  dataSource!: MatTableDataSource<any>;

  exams!: Exam[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examService: ExamService, private router: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getExams();
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
      /** Builds and returns a new User. */
      const createNewExam = (id: number) => {
        return {
          id: id,
          examName:
            data[Math.round(Math.random() * (data.length - 1))].examName,
          duration:
            data[Math.round(Math.random() * (data.length - 1))].duration,
            course: data[Math.round(Math.random() * (data.length - 1))].course,
            status: data[Math.round(Math.random() * (data.length - 1))].status,
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
    });
  }

  edit(id: number) {
    this.router.navigate(['exams/edit', id]);
  }

  delete(row: Exam) {
    this.examService.deleteExam(row);
    alert('Deleted Successfully');
    window.location.reload();
  }

  add() {
    this.router.navigate(['exams/add']);
  }

  exportData() {
    const headings = [
      [
        'id',
        'examName',
        'duration',
        'startTime',
        'endTime',
      ],
    ];

    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.exams, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Data of Exams.xlsx');
  }

}

