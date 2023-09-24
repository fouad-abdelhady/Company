import { Component, Input, Output, OnInit, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { NotificationItem } from 'src/app/models/notification/notification';
import { NotifierService } from 'src/app/services/NotificationsServices/notifier.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  @Output() onLoadMore = new EventEmitter<number>();
  @Input() notificationsList?:[NotificationItem];
  @Input() itemHeight:number = 100;
  arabic: string = "ar-EG";
  english:string = "en-US";
  defaultImage: string = "https://www.kasandbox.org/programming-images/avatars/aqualine-sapling.png"
  constructor(@Inject(LOCALE_ID) public locale: string ,private notifierService: NotifierService){
  }
  ngOnInit(): void {
   // this._getNotifications();
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
}
