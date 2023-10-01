import { Component,  EventEmitter,  Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllManagersRes } from 'src/app/models/staff/allManagers';
import { StaffMemberRegRes } from 'src/app/models/staff/staffMemberReg';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { StaffService } from 'src/app/services/staffServices/staff.service';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.css']
})
export class EmployeeRegComponent{
  @Input() show = false;
  @Input() managersList?:AllManagersRes;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  newStaffMember?:StaffMemberRegRes;
  userNameAvaliabilityMessage: string = "";
  emailAvaliabilityMessage: string = "";
  isUserNameValid = false;
  isEmailValid = false;
  error = "";
  staffMemberInfo = new FormGroup({
    fullName: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
    salary: new FormControl(1000, [Validators.required]),
    userName: new FormControl(null,[Validators.required]),
    initPassword: new FormControl(null,[Validators.required]),
    role: new FormControl(null,[Validators.required]),
    managerId: new FormControl()
  });
  constructor(private staffService: StaffService, private authService: AuthService,private router:Router){

  }

  addUser(){
    if(!this._isValid())return;
    let body = this.staffMemberInfo.value;
    this.staffService.addStaffMemeber(body).subscribe({
      next: res =>{
        this.newStaffMember = res;
        this.onNewMemberAdded.emit(this.newStaffMember);
        this.cancel();
      },
      error: err=>{
        if(err.status === 401) this.router.navigate([""]); 
        this.error = err.message;
      }
    });
  }

  private _isValid() {
    this.error = "";
    
    if(!this.staffMemberInfo.valid){
      this.error = $localize`Please fill all the fields`;
      return false;
    }
   
    if(!this.regexp.test(this.staffMemberInfo.controls.email.value!) || !this.isEmailValid){
      this.error = $localize`Enter Valid Email`;
      return false;
    }
    if(!this.isUserNameValid) {
      this.error = $localize`Enter a valid user name`;
      return false;
    }
    if(this.staffMemberInfo.controls.role.value == "employee" && !this.staffMemberInfo.controls.managerId.value){
      this.error = $localize`Select a manager`;
      return false;
    }
    if(this.staffMemberInfo.controls.salary.value!<= 0){
      this.error = $localize`Enter Valid Salary`;
      return false;
    }
    let password = `${this.staffMemberInfo.controls.initPassword.value}`;
    if(password.length < 8){
      this.error = $localize`Password must be at least 8 characters`;
      return false;
    }
    return true;
  }

  @Output() addingUerCancelled = new EventEmitter();
  @Output() onNewMemberAdded = new EventEmitter<StaffMemberRegRes>();
  cancel(){
   this.show = false;
   this.addingUerCancelled.emit();
  }

  onRoleSelectChanged(){
    let role = this.staffMemberInfo.controls.role.value;
    if(role == "manager"){
      this.staffMemberInfo.controls.managerId.disable();
      return;
    }
    this.staffMemberInfo.controls.managerId.enable();
  }
  checkUserNameAvailability(userName?:string|null){
    userName = this.staffMemberInfo.controls.userName.value;
    if(!userName) return;
    this.authService.isUserNameExists(userName).subscribe({
      next: res =>{
        if(res.state){
          this.userNameAvaliabilityMessage = $localize`The User Name is already Exists`;
          this.isUserNameValid = false;
          return;
        }
        this.isUserNameValid = true;
      },
      error: err => {
        if(err.status === 401) {
          this.router.navigate(['']);
          return;
        }
        this.isUserNameValid = false;
        this.userNameAvaliabilityMessage = "";
      }
    });
  }
  checkEmailAvailability(email?:string|null){
    email = this.staffMemberInfo.controls.email.value;
    if(!email ||!this.regexp.test(email)) return;
    this.staffService.isEmailExists(email).subscribe({
      next: res =>{
        if(res.state){
          this.emailAvaliabilityMessage = $localize`The Email is already Exists`;
          this.isEmailValid = false;
          return;
        }
        this.isEmailValid = true;
        this.emailAvaliabilityMessage = "";
      },
      error: err => {
        if(err.status === 401) {
          this.router.navigate(['']);
          return;
        }
        this.isEmailValid = false;
      }
    });
  }
}
