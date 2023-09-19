import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { AdminProfileComponent } from './admin-profile.component';
import { PagesBarComponent } from './pages-bar/pages-bar.component';
import { ProfileModule } from '../profile/profile.module';
import { EmployeeRegComponent } from './employee-reg/employee-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
@NgModule({
  declarations: [
    AdminProfileComponent,
    PagesBarComponent,
    EmployeeRegComponent
  ],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    ProfileModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class AdminProfileModule { }
