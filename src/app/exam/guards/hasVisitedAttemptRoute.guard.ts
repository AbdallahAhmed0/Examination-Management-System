import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreventRenderWithoutAttemptGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const hasVisitedAttemptRoute = localStorage.getItem('hasVisitedAttemptRoute');

    if (!hasVisitedAttemptRoute) {
      // Get the examId from the route parameters
      const examId = route.paramMap.get('id');

      // Redirect to the 'exams/attempt/:examId' route if not previously visited
      return this.router.createUrlTree(['/exams/attempt', examId]);
    }

    // Allow access to the 'exams/render/:id' route
    return true;
  }

  setAttemptRoute(value: boolean) {
    localStorage.setItem('hasVisitedAttemptRoute', value ? 'true' : '');
  }
}
