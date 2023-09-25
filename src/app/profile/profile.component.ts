import { Component,OnInit } from '@angular/core';
import { StaffService } from '../services/staffServices/staff.service';
import { UserTeamRes } from '../models/staff/userTeamRes';
import { ProfileRes } from '../models/staff/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  gettingUserInfoDone = true;
  gettingTeamDone = true;
  showLoading = false;
  userTeam?: UserTeamRes;
  profile?: ProfileRes;
  showEmployeeTasks = false;
  selectedEmployee?:number;
  constructor(private staffService: StaffService, private router:Router){
  }
  ngOnInit(): void {
    this._getUserInfo();
    this._getTeam();
  }
  private _getTeam() {
    this.gettingTeamDone = false;
    this.showLoading = true;
    this.staffService.getTeam().subscribe({
      next: res =>{
        this.userTeam = res;
       // console.log(res);
        this._dismissLoading();
      },
      error:err =>{
        if(err.status === 401)
        {
          this.router.navigate(['']);
        }
        this._dismissLoading();
      }
    });
  }

  private _getUserInfo() {
    this.gettingUserInfoDone = false;
    this.staffService.getProfileInfo().subscribe({
      next: res =>{
        this.profile = res;
        this._dismissLoading();
      },
      error:err =>{
        if(err.status === 401)
        {
          this.router.navigate(['']);
        }
        this._dismissLoading();
      }
    });
  }
  private _dismissLoading() {
    this.showLoading = (this.gettingTeamDone && this.gettingTeamDone);
  }
  shouldIShow(){
    return this.userTeam && this.userTeam.team && this.userTeam.team.length>0 && this.profile!.role.toLowerCase() == 'manager';
  }
  employeeClicked(index: number){
   // console.log('employee clicked');
    if(this.profile?.role.toLocaleLowerCase()!="manager") return;
    this.selectedEmployee = this.userTeam?.team[index].id;
    this.showEmployeeTasks = true;
    //console.log(`the employee ${this.selectedEmployee}`);
  }
  onEmployeeProfileClosed(){
    this.selectedEmployee = undefined;
    this.showEmployeeTasks = false;
  }
}
// 