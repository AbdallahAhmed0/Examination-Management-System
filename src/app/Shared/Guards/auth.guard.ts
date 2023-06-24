import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/Services/auth.service';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
roles:any[]=['SHOW_COURSE_OF_GROUP_ROLE'];

  constructor(private authService: AuthService,
              private router: Router,
              private storageService:StorageServiceService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.storageService.getUser();
      if (user) {
          // check if route is restricted by role
          // this.roles = this.storageService.getUser().roles;

          if (this.roles.includes('SHOW_EXAMS_LIST_ROLE') || this.roles.includes('SHOW_EXAM_ROLE')) {
            this.router.navigate(['/dashboard']);
          }else if(this.roles.includes('SHOW_COURSE_OF_GROUP_ROLE')){
            this.router.navigate(['/courses']);
          }
          return true;
      }else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
      }
  }
}