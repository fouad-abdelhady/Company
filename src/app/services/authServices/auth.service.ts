import { Injectable } from '@angular/core';
import { Services } from '../services';
import { HttpClient } from '@angular/common/http';
import { LoginReq, LoginRes } from 'src/app/models/auth/login';
import { PasswordUpdateReq, PasswordUpdateRes } from 'src/app/models/auth/password-update';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Services {

  constructor(private httpClient: HttpClient) {
    super();
  }
  login(cridentials:LoginReq){
    return this.httpClient.post<LoginRes>(this.getURL(AuthRoutes.login), cridentials);
  }
  updatePassword(passwordUpdaeReg:PasswordUpdateReq){
    return this,this.httpClient.put<PasswordUpdateRes>(this.getURL(AuthRoutes.updatePassword), passwordUpdaeReg);
  }
}
enum AuthRoutes{
  login = "/Auth/Login",
  updatePassword = "/Auth/Password"
}