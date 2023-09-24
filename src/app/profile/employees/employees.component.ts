import { Component, EventEmitter, Input, Output } from '@angular/core';
import { staffMember } from 'src/app/models/staff/userTeamRes';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  defaultImage = "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0"
  @Input() sectionTitle = $localize`Team Members`;
  @Input() staff?:[staffMember];
  @Output() onClick = new EventEmitter<number>();

  notifyOnClick(index: number): void {
    this.onClick.emit(index);
  }
}
