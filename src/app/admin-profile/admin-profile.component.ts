import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../services/staffServices/staff.service';
import { AllManagersRes } from '../models/staff/allManagers';
import { AllEmployeesRes } from '../models/staff/allEmployees';
import { ProfileRes } from '../models/staff/profile';
import { StaffMemberRegRes } from '../models/staff/staffMemberReg';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  showAddStaff = false;
  allManagersDone = false;
  allEmployeesDone = false;
  profileDone = false;
  showLoading = false;
  allManagers?:AllManagersRes;
  allEmployees?:AllEmployeesRes;
  profile?:ProfileRes;
  moveToLogin = false;
  constructor(private staffService: StaffService, private router: Router){

  }
  ngOnInit(): void {
    this._getAllEmployees();
    this._getAllManagers();
    this._getProfile();
  }
  private _getAllManagers(){
    this.showLoading = true;
    this.staffService.getAllManagers().subscribe({
      next: res =>{
        this.allManagers = res;
        this.allManagersDone = true;
        this._dismissLoading();
      },
      error: res=>{
        if(res.status === 401 && !this.moveToLogin){
          this.router.navigate(['']);
        }
        this.allManagersDone = true;
        this._dismissLoading();
      }
    });
  }
  private _getAllEmployees(){
    this.staffService.getAllEmployees().subscribe({
      next: res =>{
        this.allEmployees = res;
        this.allEmployeesDone = true;
        this._dismissLoading();
      },
      error: res=>{
        if(res.status === 401 && !this.moveToLogin){
          this.router.navigate(['']);
        }
        this.allEmployeesDone = true;
        this._dismissLoading();
      }
    });
  }
  private _getProfile(){
    this.staffService.getProfileInfo().subscribe({
      next: res =>{
        this.profile = res; 
        this.profileDone = true;
        this._dismissLoading();
      },
      error: res=>{
        if(res.status === 401 && !this.moveToLogin){
          this.router.navigate(['']);
        }
        this.profileDone = true;
        this._dismissLoading();
      }
    });
  }
  private _dismissLoading(){
    this.showLoading = !(this.allManagersDone && this.allEmployeesDone && this.profileDone);
  }
  showAddStaffMember(){
    this.showAddStaff  = !this.showAddStaff;
  }
  onNewMemberAdded(nemMember:StaffMemberRegRes){
    if(nemMember.role.toLocaleLowerCase() == "manager"){
      this.allManagers?.push(nemMember); return;
    }
    if(nemMember.role.toLocaleLowerCase() == "employee"){
      this.allEmployees?.staffMembers?.push(nemMember); return;
    }
  }
}
