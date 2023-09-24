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
    arTaskTitle: new FormControl(null,[Validators.required]),
    taskDescription: new FormControl(null,[Validators.required]),
    arTaskDescription: new FormControl(null,[Validators.required]),
    employeeId: new FormControl(null, [Validators.required])
  });
  addTask(){
    this.error = "";
    if(!this.taskInfo.valid){
      this.error = $localize`Fill all the fields`;
      return;
    }
    var arabic = /[\u0600-\u06FF]/;
   let taskTitle:string = this.taskInfo.controls.taskTitle.value!;
   let arTaskTitle:string = this.taskInfo.controls.arTaskTitle.value!;
   let arTaskDescription:string = this.taskInfo.controls.arTaskDescription.value!;
   
   if(taskTitle.length > 32 || arTaskTitle.length > 32){
      this.error = $localize`Only 32 characters are allowed`;
      return;
   }
   if(!arabic.test(arTaskTitle) || !arabic.test(arTaskDescription)){
      this.error = $localize`Make sure to write the title and description in arabic`;
      return;
   }
    this.taskService.assignTask(
      this.taskInfo.controls.taskTitle.value!,
      this.taskInfo.controls.arTaskTitle.value!, 
      this.taskInfo.controls.taskDescription.value!, 
      this.taskInfo.controls.arTaskDescription.value!,
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
