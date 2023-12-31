import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileRes } from 'src/app/models/staff/profile';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { StaffService } from 'src/app/services/staffServices/staff.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  selectedPic?: string;
  @Input() profile?: ProfileRes;
  arabic: string = "ar-EG";
  english: string = "en-US";
  defulatImage = "https://iili.io/HUfysQS.jpg";
  constructor(@Inject(LOCALE_ID) public locale: string, private router: Router, private staffService:StaffService){
    this.profile = this.profile??{
      id:0,
      fullName: "Full Name Here",
      role: "Role Here",
      email: "example@example.com",
      image: "https://iili.io/HUfysQS.jpg"
    };
  }
  pickImage(){
    document.getElementById('profileImageInput')?.click();

  }
  onImagePicked(event:any){
    const selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e)=>{
      this._onImageLoaded(e)
    };
    
    reader.readAsDataURL(selectedFile);
  }
  private _onImageLoaded(e: ProgressEvent<FileReader>){
    this.selectedPic = e.target!.result as string;
    this._updateProfileImage();
  }
  private _updateProfileImage() {
    if(!this.selectedPic) return;
    this.staffService.updateProfileImage({newImage: this.selectedPic}).subscribe({
      next: res=>{
          this.profile!.image = this.selectedPic!;
      },
      error: err=>{

      }
    });
  }
  logout(){
    localStorage.removeItem(AuthInterceptor.TOKEN_KEY);
    this.router.navigate(['']);
  }
  getRole(role:string){
    if(this.locale == this.arabic){
      if(role.toLocaleLowerCase() == "employee") return "موظف";
      if(role.toLocaleLowerCase() == "manager") return "مدير";
      if(role.toLocaleLowerCase() == "admin") return "أدمن";
    }
    return role;
  }
}
