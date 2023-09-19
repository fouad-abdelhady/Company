import { Component, EventEmitter, Input, Output } from '@angular/core';
import { task } from 'src/app/models/tasks/userTasksModel';
import { TaskServicesService } from 'src/app/services/taskServices/task-services.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() task?:task;
  @Input() show:boolean = false;
  @Output() onTaskDetailsClose = new EventEmitter<boolean>();
  @Output() onTaskUpdate = new EventEmitter<boolean>();
  taskStatus?: number;
  givenGrade?: number;
  defulatImage = "https://iili.io/HUfysQS.jpg";
  error = "";
  constructor( private taskService: TaskServicesService){
  }
  getStatus(stauts:number){
    switch(stauts){
      case 1: return "Seen";
      case 2: return "On Progress";
      case 3: return "Done";
      case 4: return "Graded";
      default: return "";
    }
  }

 
  closeSideBar(){
    this.show = false;
    this.onTaskDetailsClose.emit(false);
  }
  updateStatus(){
   if(!this._vaildateStatus()) return;
    this.error = "";
    this.taskService.UpdateTaskStatus(this.task?.id!, this.taskStatus!).subscribe({
      next: res =>{
        if(!res.state) {
          this.error = res.message;
          return;
        }
        this.task!.status = this.taskStatus!;
        this.onTaskUpdate.emit(true);
        this.closeSideBar();
      },
      error: err =>{
        this.closeSideBar();
      }
    });
  }

  setGrade(){
    if(!this._validateGrade())return;
    this.taskService.UpdateTasksGrade(this.task!.id, this.givenGrade!).subscribe({
      next: res =>{
        if(!res.state) {
          this.error = res.message;
          return;
        }
        this.task!.grade = this.givenGrade!;
        this.onTaskUpdate.emit(true);
        this.closeSideBar();
      },
      error: err =>{
        this.closeSideBar();
      }
    });
  }
  private _validateGrade() {
    this.error = "";
    if(!this.givenGrade){
      this.error = "Set grade between 0 and 10";
      return false;
    }
    if(this.givenGrade < 0 || this.givenGrade > 10){
      this.error = "The given grade must be between 0 and 10";
      return false;
    }
    return true;
  }
  private _vaildateStatus() {
    if(!this.taskStatus){
      this.error = "Select Status";
      return  false;
    }
    if(this.taskStatus == this.task?.status){
      this.error = `The task is already ${this.taskStatus == 2? "On Progress": "Done"}`;
      return false;
    }
    return true;
  }
}
