import { Component, Input } from '@angular/core';
import { staffMember } from 'src/app/models/staff/userTeamRes';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent {
  @Input() manager?: staffMember;
  defaultImage = "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0";
}
