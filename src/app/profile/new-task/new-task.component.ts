import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { staffMember } from 'src/app/models/staff/userTeamRes';
import { TaskServicesService } from 'src/app/services/taskServices/task-services.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  @Input() show: boolean = false;
  @Input() employeesList?:[staffMember];
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  constructor(private taskService: TaskServicesService){

  }
   error: string = '';  
  taskInfo = new FormGroup({
    taskTitle: new FormControl(null,[Validators.required]),
    taskDescription: new FormControl(null,[Validators.required]),
    employeeId: new FormControl(null, [Validators.required])
  });
  addTask(){
    if(!this.taskInfo.valid){
      this.error = "Fill all the fields";
      return;
    }
    this.taskService.assignTask(
      this.taskInfo.controls.taskTitle.value!, 
      this.taskInfo.controls.taskDescription.value!, 
      this.taskInfo.controls.employeeId.value!).subscribe({
        next: res =>{
          this.error = "";
          this.show = false
        }
      });
    
  }
  cancel(){
    this.show = false
    this.onClose.emit(this.show);
  }
  showAddNewTask(){
    this.show = true;
  }
}
