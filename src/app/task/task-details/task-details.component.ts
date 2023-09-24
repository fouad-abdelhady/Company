import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { task } from 'src/app/models/tasks/userTasksModel';
import { TaskServicesService } from 'src/app/services/taskServices/task-services.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() task?: task;
  @Input() show: boolean = false;
  @Output() onTaskDetailsClose = new EventEmitter<boolean>();
  @Output() onTaskUpdate = new EventEmitter<boolean>();
  taskStatus?: number;
  givenGrade?: number;
  arabic: string = "ar-EG";
  english: string = "en-US";
  defulatImage = "https://iili.io/HUfysQS.jpg";
  error = "";
  notGraded = $localize`Not Graded`;
  changesRequested = new FormGroup({
    changes: new FormControl(null, [Validators.required]),
    arChanges: new FormControl(null, [Validators.required])
  });
  constructor(@Inject(LOCALE_ID) public locale: string, private taskService: TaskServicesService) {
  }
  getStatus(stauts: number) {
    switch (stauts) {
      case 1: return $localize`Seen`;
      case 2: return $localize`On Progress`;
      case 3: return $localize`Done`;
      case 4: return $localize`Graded`;
      default: return "";
    }
  }

  getText(arabic: string, english: string): string {
    return this.locale == this.arabic ? arabic : english;
  }
  closeSideBar() {
    this.show = false;
    this.onTaskDetailsClose.emit(false);
  }
  updateStatus() {
    if (!this._vaildateStatus()) return;
    this.error = "";
    this.taskService.UpdateTaskStatus(this.task?.id!, this.taskStatus!).subscribe({
      next: res => {
        if (!res.state) {
          this.error = res.message;
          return;
        }
        this.task!.status = this.taskStatus!;
        this.onTaskUpdate.emit(true);
        this.closeSideBar();
      },
      error: err => {
        this.closeSideBar();
      }
    });
  }

  setGrade() {
    if (!this._validateGrade()) return;
    this.taskService.UpdateTasksGrade(this.task!.id, this.givenGrade!).subscribe({
      next: res => {
        if (!res.state) {
          this.error = res.message;
          return;
        }
        this.task!.grade = this.givenGrade!;
        this.onTaskUpdate.emit(true);
        this.closeSideBar();
      },
      error: err => {
        this.closeSideBar();
      }
    });
  }
  private _validateGrade() {
    this.error = "";
    if (!this.givenGrade) {
      this.error = $localize`Set grade between 0 and 10`;
      return false;
    }
    if (this.givenGrade < 0 || this.givenGrade > 10) {
      this.error = $localize`The given grade must be between 0 and 10`;
      return false;
    }
    return true;
  }
  private _vaildateStatus() {
    if (!this.taskStatus) {
      this.error = $localize`Select Status`;
      return false;
    }
    if (this.taskStatus == this.task?.status) {
      let firstPart =$localize`The task is already`;
      let onProgress = $localize`On Progress`;
      let done = $localize`Done`;
      this.error = `${firstPart} ${this.taskStatus == 2 ? onProgress : done}`;
      return false;
    }
    return true;
  }

  requestChanges() {
    if (!this._validateRequestedChanges()) return;
    this.taskService.UpdateTaskRequestedChanges({ taskId: this.task?.id, changes: this.changesRequested.controls.changes.value, arChanges: this.changesRequested.controls.arChanges.value, employeeId: this.task?.staffMember.id }).subscribe({
      next: res => { 
        if(res.state){
          this.onTaskUpdate.emit(true);
          this.closeSideBar();
          return;
        }
        this.error = res.message;
      },
      error: err => {
        this.error = $localize`Error Occured while adding changes`;
       }
    });
  }
  private _validateRequestedChanges() {
    this.error = "";
    if (!this.changesRequested.valid) {
      this.error = $localize`Fill the changes and changes in arabic fields.`;
      return false;
    }
    if (!/[\u0600-\u06FF]/.test(this.changesRequested.controls.arChanges.value!)) {
      this.error = $localize`Enter arabic translation for the changes`;
      return false;
    }
    if (/[\u0600-\u06FF]/.test(this.changesRequested.controls.changes.value!)) {
      this.error = $localize`Enter English translation for the changes`;
      return false;
    }
    return true;
  }
}
