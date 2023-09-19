import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static readonly TOKEN_KEY = "Hello World";
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this._getToken()}`)
    });
    console.log(req.headers);
    return next.handle(req);
  }
  
  private _getToken() {
    return localStorage.getItem(AuthInterceptor.TOKEN_KEY)??"";
  }
}
