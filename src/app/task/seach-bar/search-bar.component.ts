import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  search?:string;
  @Output() onKeywordUpdate = new EventEmitter<string>();
  onChange(){
    this.onKeywordUpdate.emit(this.search);
  }
}
