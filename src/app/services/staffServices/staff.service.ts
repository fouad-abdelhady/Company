import { Injectable } from '@angular/core';
import { Services } from '../services';
import { HttpClient } from '@angular/common/http';
import { UserTeamRes } from 'src/app/models/staff/userTeamRes';
import { AllEmployeesRes } from 'src/app/models/staff/allEmployees';
import { StaffMemberRegReq, StaffMemberRegRes } from 'src/app/models/staff/staffMemberReg';
import { ProfileRes } from 'src/app/models/staff/profile';
import { ProfileImageUpdateReq, ProfileImageUpdateRes } from 'src/app/models/staff/profileImageUpdate';
import { AllManagersRes } from 'src/app/models/staff/allManagers';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends Services{

  constructor(private httpClient: HttpClient) {
    super();
  }
  getTeam(){
    console.log(this.getURL(StaffRoutes.getTeam));
    return this.httpClient.get<UserTeamRes>(this.getURL(StaffRoutes.getTeam));
  }
  getAllEmployees(page = 1, limit = 8){
    return this.httpClient.get<AllEmployeesRes>(`${this.getURL(StaffRoutes.getAllEmployees)}?page=${page}&limit=${limit}`);
  }
  addStaffMemeber(reqBody?:any){
    return this.httpClient.post<StaffMemberRegRes>(this.getURL(StaffRoutes.addStaffMember), reqBody);
  }
  getProfileInfo(){
    return this.httpClient.get<ProfileRes>(this.getURL(StaffRoutes.getProfileInfo))
  }
  updateProfileImage(reqBody:ProfileImageUpdateReq){
    return this.httpClient.put<ProfileImageUpdateRes>(this.getURL(StaffRoutes.updateProfileImage), reqBody);
  }
  getAllManagers(){
    return this.httpClient.get<AllManagersRes>(this.getURL(StaffRoutes.getAllManagers));
  }
}
enum StaffRoutes{
  getTeam = "/Staff/Profile",
  getAllEmployees  = "/Staff/All",
  addStaffMember = "/Staff",
  getProfileInfo = "/Staff/UserInfo",
  updateProfileImage = "/Staff/ProfilePic",
  getAllManagers = "/Staff/Managers"
}