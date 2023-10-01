
import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServicesService } from 'src/app/services/taskServices/task-services.service';
import { NotifierService } from 'src/app/services/NotificationsServices/notifier.service';
import { NotificationItem } from 'src/app/models/notification/notification';
import { PageInfo } from 'src/app/models/common/pageInfo';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  showNotifications: boolean = false;
  notificationsList?: [NotificationItem];
  arabic: string = "ar-EG";
  english:string = "en-US";
  defaultImage: string = "https://www.kasandbox.org/programming-images/avatars/aqualine-sapling.png";
  @Input() name = "";
  tasksCount = 0;
  @Input() employeeId = 0;
  itemHeight = 185;
  @ViewChild('notificationDetails') notificationDetailsRef?: ElementRef;
  notificationsDetails?:HTMLElement;
  pageInfo?: PageInfo;
  constructor(@Inject(LOCALE_ID) public locale: string  ,private router: Router, private notifier: NotifierService, private tasksServices: TaskServicesService) {
  }
  ngAfterViewInit(): void {
    this.notificationsDetails = this.notificationDetailsRef!.nativeElement;
  }
  ngOnDestroy(): void {
    this.notifier.closeConnection();
  }
  ngOnInit(): void {
    this.getUnseenNotificationsCount();
    this.initNotifierService();
  }
  getUnseenNotificationsCount() {
    this.notifier.getUnseenNotificationsCount().subscribe({
      next: res => {
        this.tasksCount = res;
      },
      error: err => {

      }
    });
  }
  initNotifierService() {
    if (this.employeeId == 0) return;
    this.notifier.employeeId = this.employeeId;
    this.notifier.UpdateUnseenCount = (newCount: number) => {
      this.tasksCount = newCount;
    }
    this.notifier.startConnection();
    this.notifier.addTransferDataListener();
  }
  moveToTasks(taskId?: number, taskTitle?: string) {
    this.router.navigate(['tasks'], {queryParams:{taskId: taskId, title: taskTitle}});
  }
  showNotificationsBar() {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.notificationsDetails = document.getElementById('notificationDetails')!;
      this._getNotifications();
    }
    else{
      this.notificationsDetails!.style.height = `0px`;
     // this.tasksCount = 0;
      this.notificationsList = undefined;
    }
  }
  private _getNotifications(page = 1) {
    this.notifier.getNotificationsByStatus(this.tasksCount == 0 ? 1 : 0, page).subscribe({
      next: res => {
        if(this.tasksCount == 1 || !this.notificationsList){
          this.notificationsList = res.notifications;
        }else{
          this.notificationsList.push(...res.notifications);
        }
        this.pageInfo = res.pageInfo;
        this.notificationsDetails!.style.height = 
          this.notificationsList!.length > 3?
          `${3 * this.itemHeight}px`:
          `${this.notificationsList!.length * this.itemHeight}px`;
         if(this.locale == this.arabic){
          this.notificationsDetails!.style.left = '0%'
          this.notificationsDetails!.style.right = "auto";
         }
      },
      error: err => {

      }
    })
  }
  getHeight(){
    return `${this.itemHeight - 20}px`;
  }
  getPosterName(notification:NotificationItem){
    return notification.poster.name.split(' ')[0];
  }
  getText(arabic:string, english:string){
    return this.locale == this.arabic? arabic: english;
  }
  loadMore(){
    this._getNotifications(this.pageInfo?.next??1);
  }
  ShowTaskDetails(notificationIndex:number){
    if(this.notificationsList![notificationIndex].status>0){
      this.notificationsList![notificationIndex];
      this.showNotificationsBar();
    }
    this.notifier.updateNotificationsStatus(this.notificationsList![notificationIndex].id).subscribe({
      next: res =>{
        if(!res.state)  return; //TODO: you need to notify on Error here
        this.tasksCount = res.optionalNum;
        this.moveToTasks(this.notificationsList![notificationIndex].taskId, this.notificationsList![notificationIndex].taskTitle);
      },
      error: error =>{
        //TODO: you need to notify on Error here
      }
    });
    //you need to send request to set the notification to seen if it is not already seen
    //send the notification title and id to the tasks page
  }

  getFormattedDate(dateStr: string){
    return new Date(dateStr);
  }
}
