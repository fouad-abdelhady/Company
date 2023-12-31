import { Component, EventEmitter, Output, Input, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {TaskServicesService} from '../../services/taskServices/task-services.service';
import { task } from 'src/app/models/tasks/userTasksModel';
@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.css']
})
export class EmployeeTasksComponent implements OnInit {
  
  @Output() onWindowClose = new EventEmitter();
  @Input() show = true;
  @Input() employeeId?:number;
  arabic: string = "ar-EG";
  english:string = "en-US";
  defulatImage = "https://iili.io/HUfysQS.jpg";
  tasksList?: [task];
  constructor( @Inject(LOCALE_ID) public locale: string ,private tasksServie: TaskServicesService){
//
  }
  closeWindow(){
    this.show = false;
    this.onWindowClose.emit();
  }
  ngOnInit(): void {
    if(this.employeeId)
    this.GetEmployeeGradedTasks();
  }
  GetEmployeeGradedTasks() {
    this.tasksServie.GetEmployeeGradedTasks(this.employeeId!, 4).subscribe({
      next: res =>{
        this.tasksList = res;

      },
      error: err => {
        this.closeWindow();
      }
    });
  }
  getText(arabic:string, english:string):string{
    return this.locale == this.arabic? arabic : english;
  }

  getImage(){
    if(this.tasksList && this.tasksList.length > 0 && this.tasksList[0].staffMember.image){
      return this.tasksList[0].staffMember.image;
    }
    return this.defulatImage;
  }
}
