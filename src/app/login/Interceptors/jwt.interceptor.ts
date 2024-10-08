import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../Services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private storageService:StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url

        const token = this.storageService.getToken();
        const isLoggedIn = this.storageService.isLoggedIn();
        const isApiUrl = request.url.startsWith(`${environment.APPURL}`);
        if (isLoggedIn ) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            });
        }
        return next.handle(request);
    }
}
