
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServicesService } from 'src/app/services/taskServices/task-services.service';
import { NotifierService } from 'src/app/services/taskServices/taskNotifier/notifier.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit, OnDestroy {
  constructor(private router:Router, private notifier: NotifierService, private tasksServices: TaskServicesService){
  }
  ngOnDestroy(): void {
    console.log("Connecetion Closed");
    this.notifier.closeConnection();
  }
  ngOnInit(): void {
    this.getUnseenTasksCount();
    this.initNotifierService();
  }
  getUnseenTasksCount() {
    this.tasksServices.GetUnseenTasksCount().subscribe({
      next: res =>{
        this.tasksCount = res;
      },
      error: err =>{

      }
    });
  }
  initNotifierService() {
    if(this.employeeId == 0) return;
    this.notifier.employeeId = this.employeeId;
    this.notifier.UpdateUnseenCount = ( newCount:number)=>{
      this.tasksCount = newCount;
    }
    this.notifier.startConnection();
    this.notifier.addTransferDataListener();
  }
  moveToTasks(){
    this.router.navigate(['tasks'])
  }
  @Input() name = "";
 tasksCount = 0;
  @Input() employeeId = 0;
}
