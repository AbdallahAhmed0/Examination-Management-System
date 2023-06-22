import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogeComponent } from '../Shared/material/custom-dialoge/custom-dialoge.component';
import { ExamService } from './Services/exam.service';

@Injectable()
export class PreventUrlChangeGuard implements CanDeactivate<any> {
  constructor(private dialog: MatDialog,
              private examServices:ExamService){}
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check your condition here to prevent URL change
    const dialogRef = this.dialog.open(CustomDialogeComponent, {
      width: '400px',
      height: '280px',
      data: { value: "You Can't close Exam without Click Submit Exam.",
      header:'Not Allowed' } // Pass the value as an object property
    });

    return new Observable<boolean>((observer) => {
      // Subscribe to the dialog's afterClosed event
      if(this.examServices.variableSubject.getValue()){
        observer.next(true); // allow the URL change
        this.examServices.variableSubject.next(false);

      }else{
      dialogRef.afterClosed().subscribe((result) => {
          observer.next(false); // Prevent the URL change
      });
    }
    observer.complete();
    });

  }
}
