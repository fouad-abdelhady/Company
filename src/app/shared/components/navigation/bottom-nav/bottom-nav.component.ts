import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from 'src/app/models/common/pageInfo';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {
  @Input() pageInfo?: PageInfo;
  @Output() onPageRequest: EventEmitter<number> = new EventEmitter() ;
  GetPage(newPage:number){
    this.onPageRequest.emit(newPage);
  }
}
