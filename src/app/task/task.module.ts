import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class TaskModule { }
