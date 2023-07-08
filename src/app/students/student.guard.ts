import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageServiceService } from '../login/Services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  userPer:Object []=[]
  constructor( private storageService:StorageServiceService,router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       this.userPer = this.storageService.getUser().permissions
      console.log(this.userPer);
      if ( this.userPer.some((role:any) => role.authority === 'MANAGE_STUDENT_ROLE') ||
           this.userPer.some((role:any) => role.authority === 'SHOW_ALL_STUDENTS_ROLE') ||
           this.userPer.some((role:any) => role.authority === 'SHOW_STUDENTS_COURSE_ROLE')
            ) {

                         return true;


                }
                else {
                  return false
                }



  }

}
