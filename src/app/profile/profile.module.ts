import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderComponent } from './header/header.component';
import { ManagersComponent } from './managers/managers.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    ManagersComponent,
    EmployeesComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedComponentsModule
  ],
  exports:[
    HeaderComponent,
    ManagersComponent,
    EmployeesComponent,
    ProfileInfoComponent
  ]
})
export class ProfileModule {
  
 }
