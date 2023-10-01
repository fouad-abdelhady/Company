import { Injectable } from '@angular/core';
import { Services } from '../services';
import { HttpClient } from '@angular/common/http';
import { LoginReq, LoginRes } from 'src/app/models/auth/login';
import { PasswordUpdateReq, PasswordUpdateRes } from 'src/app/models/auth/password-update';
import { RegularRes } from 'src/app/models/common/regular';

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
    return this.httpClient.put<PasswordUpdateRes>(this.getURL(AuthRoutes.updatePassword), passwordUpdaeReg);
  }
  isUserNameExists(userName?:string){

    return this.httpClient.get<RegularRes>(`${this.getURL(AuthRoutes.isUserNameExists)}${userName}`);
  }
}
enum AuthRoutes{
  login = "/Auth/Login",
  updatePassword = "/Auth/Password",
  isUserNameExists = "/Auth/checkUserName/"
}