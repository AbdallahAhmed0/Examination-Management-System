
import { Component,  OnInit, ViewChild,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {DialogeComponent} from '../../../Shared/material/dialog/dialog.component';
import { ExamService } from './../../Services/exam.service';


@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.scss']
})
export class ExamStudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'Group', 'Score','status','Date','actions'];
  dataSource!: MatTableDataSource<any>;
  subExStudents?:Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: number;


  constructor(private ExamService:ExamService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.subExStudents =this.activatedRoute.paramMap.subscribe((paramMap)=>{
        this.id=Number(paramMap.get('id'));
            this.ExamService.getAllUsersAttemptExam(this.id).subscribe(data=>{

              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

                })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subExStudents?.unsubscribe();
    }

}
