import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderComponent } from './header/header.component';
import { ManagersComponent } from './managers/managers.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { EmployeeTasksComponent } from './employee-tasks/employee-tasks.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    ManagersComponent,
    EmployeesComponent,
    ProfileInfoComponent,
    NewTaskComponent,
    EmployeeHeaderComponent,
    EmployeeTasksComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule
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
