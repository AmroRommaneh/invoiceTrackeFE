import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {STORAGE} from './shared.constants';

const TOKEN_HEADER_KEY = "Authorization";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = localStorage.getItem(STORAGE.TOKEN);
    if (token != null) {
      console.log("jhjjjsjsjsjsjsjsjjs");
      
      authReq = req.clone({headers: req.headers.set("Access-Control-Allow-Origin","*")});
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)});
      console.log(authReq);
    }
    return next.handle(authReq);
  }
}

export const AuthInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
