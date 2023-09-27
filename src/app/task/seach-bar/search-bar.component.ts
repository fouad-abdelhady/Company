import { Component, EventEmitter, Output, Input, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    if(!this.isFeteched){
      this.onKeywordUpdate.emit(this.searchTerm);
      this.isFeteched = true;
    }
  }
  isFeteched = false;
  ngOnInit(): void {
    this.isFeteched = false;
    this.search = this.searchTerm;
    if(this.searchTerm) this.onChange();
  }
  search?:string;
  @Input() searchTerm?:string;
  @Output() onKeywordUpdate = new EventEmitter<string>();
  onChange(){
    this.onKeywordUpdate.emit(this.search);
  }
}
