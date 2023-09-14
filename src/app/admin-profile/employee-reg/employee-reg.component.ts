import { Component,  EventEmitter,  Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllManagersRes } from 'src/app/models/staff/allManagers';
import { StaffMemberRegRes } from 'src/app/models/staff/staffMemberReg';
import { StaffService } from 'src/app/services/staffServices/staff.service';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.css']
})
export class EmployeeRegComponent{
  @Input() show = false;
  @Input() managersList?:AllManagersRes;
  newStaffMember?:StaffMemberRegRes;
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
  constructor(private staffService: StaffService, private router:Router){

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
      this.error = "Please fill all the fields";
      return false;
    }
    if(this.staffMemberInfo.controls.role.value == "employee" && !this.staffMemberInfo.controls.managerId.value){
      this.error ="Select a manager";
      return false;
    }
    if(this.staffMemberInfo.controls.salary.value!<= 0){
      this.error = "Enter Valid Salary";
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
}
