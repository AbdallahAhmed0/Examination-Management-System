import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/app/login/Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      // User is already logged in, redirect to a different page
      this.router.navigate(['/dashboard']); // Replace '/dashboard' with the desired page URL
      return false;
    }

    // User is not logged in, allow access to the login page
    return true;
  }
}
