import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreventRenderWithoutAttemptGuard implements CanActivate {
  private hasVisitedAttemptRoute = false;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.hasVisitedAttemptRoute) {
    // Get the examId from the route parameters
    const examId = route.paramMap.get('id');

    // Redirect to the 'exams/attempt/:examId' route if not previously visited
    return this.router.createUrlTree(['/exams/attempt', examId]);

    }

    // Allow access to the 'exams/render/:id' route
    return true;
  }

  setAttemptRoute(value:boolean) {
    this.hasVisitedAttemptRoute = value;
  }
}
