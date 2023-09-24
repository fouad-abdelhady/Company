import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './seach-bar/search-bar.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailsComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
