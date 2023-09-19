import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { BottomNavComponent } from './navigation/bottom-nav/bottom-nav.component';



@NgModule({
  declarations: [
    LoadingComponent,
    BottomNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingComponent,
    BottomNavComponent
  ]
})
export class SharedComponentsModule { }
