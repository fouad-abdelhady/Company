import { Component, OnInit, LOCALE_ID, Inject  } from '@angular/core';
import { AuthService } from '../services/authServices/auth.service';
import { AuthInterceptor } from '../services/auth.interceptor';
import { Router } from '@angular/router';
import { StaffService } from '../services/staffServices/staff.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userName: string = "";
  password: string = "";
  error: string = "";
  showLoading: boolean = false;
  constructor(@Inject(LOCALE_ID) private locale: string,private authService: AuthService, private staffService: StaffService, private router:Router) {

  }
  ngOnInit(): void {
    console.log('Current Locale:', this.locale);
    this._checkUserState();
  }
  login() {
    this.error = "";
    if(!this._isvalid()) return;
    this.showLoading = true;
    this.authService.login({
      userName: this.userName,
      password: this.password
    }).subscribe({
      next: res => {
        this.showLoading = false;
        localStorage.setItem(AuthInterceptor.TOKEN_KEY, res.accessToken);
        this._onLoginSuccess(res.role);
      },
      error: err=>{
        this.showLoading = false;
        if(err.status === 401) this.error = $localize`Wrong user name or password.`      }
    });
  }
  private _isvalid() {
    if(this.userName && this.password) return true;
    this.error = $localize`Enter the user name and password.`;
    return false;
  }
  private _onLoginSuccess(role: string){
    if(role.toLocaleLowerCase() == "manager" || role.toLocaleLowerCase() == "employee"){
      this.router.navigate(['profile'],{ replaceUrl:true});
      return;
    }if(role.toLocaleLowerCase() == "admin"){
      this.router.navigate(['admin-profile']);
      return;
    }
  }
  private _checkUserState(){
    let accessToken = localStorage.getItem(AuthInterceptor.TOKEN_KEY);
    if(!accessToken) return;
    this.showLoading = true;
    this.staffService.getProfileInfo().subscribe({
      next: res=>{
        this.showLoading = false;
        this._onLoginSuccess(res.role);
      },
      error: res=>{
        this.showLoading = false;
      }
    });
  }
}
