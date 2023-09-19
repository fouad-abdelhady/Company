import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TaskServicesService } from '../services/taskServices/task-services.service';
import { UserTasks, task } from '../models/tasks/userTasksModel';
import { Router } from '@angular/router';
import { NotifierService } from '../services/taskServices/taskNotifier/notifier.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  showLoading:boolean = false;
  taskDetails:boolean = false;
  userTasksRes?:UserTasks;
  selectedTask?: task;
  defulatImage = "https://iili.io/HUfysQS.jpg";
  isNotificationInit = false;
  constructor(private taskService: TaskServicesService, private nottifer: NotifierService, private router: Router){}
  ngOnDestroy(): void {
    this.nottifer.closeConnection();
  }
  ngOnInit(): void {
    this.isNotificationInit = false;
    this._GetMyTasks();
  }
  initNotifierService() {
    if(this.userTasksRes?.callerId == 0) return;
    this.nottifer.employeeId = this.userTasksRes!.callerId!;
    this.nottifer.UpdateUnseenCount = (count:number)=>{ 
      this.showLoading = true;
    this.taskService.GetMyTasks().subscribe({
      next: res => {
        this.userTasksRes = res;
        this.showLoading = false;
        if(!this.isNotificationInit)this.initNotifierService();
      },
      error: error => {
        if(error.status === 401){
          this.router.navigate([""]);
        }
        this.showLoading = false;
      }
    });
    };
    this.nottifer.startConnection();
    this.nottifer.addTransferDataListener();
  }
  private _GetMyTasks() {

    this.showLoading = true;
    this.taskService.GetMyTasks().subscribe({
      next: res => {
        this.userTasksRes = res;
        this.showLoading = false;
        if(!this.isNotificationInit)this.initNotifierService();
      },
      error: error => {
        if(error.status === 401){
          this.router.navigate([""]);
        }
        this.showLoading = false;
      }
    });
  }
  getTaskColor(stauts:number){
    switch(stauts){
      case 1: return "rgba(202, 12, 12, 0.901)";
      case 2: return "orange";
      case 3: return "rgb(76, 202, 18)";
      case 4: return "white";
      default: return "";
    }
  }
  showTaskDetails(index:number){
    this.selectedTask = this.userTasksRes?.tasksList[index];
    this.taskDetails = true;
  }
  closeTaskDetails(){
    this.taskDetails = false;
  }
  onTaskUpdate(){
    this._GetMyTasks();
  }
}
