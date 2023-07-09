import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../login/Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userPer: Object[] = []
  constructor(private storageService: StorageService, router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userPer = this.storageService.getUser().permissions
    if (this.userPer.some((role: any) => role.authority === 'SHOW_ADMINS_LIST_ROLE') ||
      this.userPer.some((role: any) => role.authority === 'MANAGE_ADMIN_ROLE')) {

        return true;

    }
    else {
      return false
    }

  }

}
