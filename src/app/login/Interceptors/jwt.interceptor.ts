import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../Services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url

<<<<<<< HEAD
    const token = this.storageService.getToken();
    const isLoggedIn = this.storageService.isLoggedIn();
    const isApiUrl = request.url.startsWith('http://142.93.192.45:8088/api');
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`
=======
        const token = this.storageService.getToken();
        const isLoggedIn = this.storageService.isLoggedIn();
        const isApiUrl = request.url.startsWith('http://142.93.192.45:8087/api');
        if (isLoggedIn ) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            });
            console.log(token)
>>>>>>> 9095859eefeefd5ede17393ad6884d242ea8d017
        }
      });
      console.log(token)
    }
    return next.handle(request);
  }
}
