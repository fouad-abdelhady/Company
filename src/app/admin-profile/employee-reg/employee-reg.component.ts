import { Component,  EventEmitter,  Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.css']
})
export class EmployeeRegComponent{
  @Input() show = false;
  @Input() managersList =[
    {
      name: "Manager 1",
      id:1
    },
    {
      name: "Manager 2",
      id:2
    },
    {
      name: "Manager 3",
      id:3
    },
    {
      name: "Manager 4",
      id:4
    }

  ]
  staffMemberInfo = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl(),
    salary: new FormControl(),
    userName: new FormControl(),
    initPassword: new FormControl(),
    role: new FormControl()
  });
  addUser(){
    
  }
  @Output() addingUerCancelled = new EventEmitter();
  cancel(){
   this.show = false;
   this.addingUerCancelled.emit();
  }
}
