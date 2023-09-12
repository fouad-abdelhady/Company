import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  selectedPic?: string;
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
    console.log(this.selectedPic)
  }
}
