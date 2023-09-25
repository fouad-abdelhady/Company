
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Services } from '../services';
import { NotificationItem, PaginatedNotificationsRes } from 'src/app/models/notification/notification';
@Injectable({
  providedIn: 'root'
})
export class NotifierService extends Services {
  UpdateUnseenCount?: Function;
  RefreshTasksList?: Function;
  public hubConnection?: signalR.HubConnection;
  employeeId: number = 0;
  constructor(private httpClient: HttpClient) { 
    super();
  }

  getUnseenNotificationsCount(){
    return this.httpClient
      .get<number>(this.getURL(NotificationsRoutes.getUnseenNoticationsCount));
  }
  getNotificationsByStatus(status:number, page:number = 1, limit:number = 4){
     let url = `${this.getURL(NotificationsRoutes.getNotificationsByState)}${status}?page=${page}&limit=${limit}`;
    return this.httpClient
      .get<PaginatedNotificationsRes>(url);
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7012/NewTaskAssigned')
      .build();
    this.hubConnection
      .start()
      .then(() => {
        //console.log('Connection started')
        this.sendDataToServer();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
    
  }
  public addTransferDataListener = () => {
    this.hubConnection!.on('NotifyEmployee', (itemsCount) => {
     // console.log("Notification Recieved");
      if(this.UpdateUnseenCount) this.UpdateUnseenCount!(itemsCount);
      if(this.RefreshTasksList) this.RefreshTasksList();
    });
  }
  private sendDataToServer(){
    this.hubConnection?.invoke("NotifyEmployee", this.employeeId).then(() => {
      //console.log("Have sent Successfully");
    }).catch(err=>console.log(err));
  }
  public closeConnection(){
    this.hubConnection?.stop();
  }
}

enum NotificationsRoutes{
  getUnseenNoticationsCount = "/Notification/Count",
  getNotificationsByState = "/Notification/"
}
