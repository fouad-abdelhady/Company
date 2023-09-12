import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  @Input() sectionTitle = 'Team Members';
  @Input() staff = [
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    },
    {
      image:"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      name:"Wenston",
      email:"fouad.abdelhady@egabi.com"
    }
  ]

}
