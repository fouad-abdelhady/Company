import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() name = "";
  @Input() role = "";
  constructor(private router: Router){

  }
  moveToTasksScreen(){
    this.router.navigate(["tasks"]);
  }

}
