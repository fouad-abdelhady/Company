import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Services } from '../../services';
@Injectable({
  providedIn: 'root'
})
export class NotifierService extends Services {
  UpdateUnseenCount?: Function;
  RefreshTasksList?: Function;
  employeeId: number = 0;
  constructor() { 
    super();
  }

  public hubConnection?: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7012/NewTaskAssigned')
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.sendDataToServer();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
    
  }

  public addTransferDataListener = () => {
    this.hubConnection!.on('NotifyEmployee', (itemsCount) => {
      console.log("Notification Recieved");
      if(this.UpdateUnseenCount) this.UpdateUnseenCount!(itemsCount);
      if(this.RefreshTasksList) this.RefreshTasksList();
    });
  }
   private sendDataToServer(){
    this.hubConnection?.invoke("NotifyEmployee", this.employeeId).then(() => {
      console.log("Have sent Successfully");
    }).catch(err=>console.log(err));
   }
   public closeConnection(){
    this.hubConnection?.stop();
   }
}
