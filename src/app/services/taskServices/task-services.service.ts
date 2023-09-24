import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services } from '../services';
import { TaskResponse } from 'src/app/models/tasks/assignTaskRes';
import { UserTasks, task } from 'src/app/models/tasks/userTasksModel';
import { RegularRes } from 'src/app/models/common/regular';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService extends Services {
  constructor(private httpClient: HttpClient) { super(); }
  assignTask(
    title: string,
    arTitle: string,
    description: string,
    arDescription: string,
    employeeId: number) {
    return this.httpClient.post<TaskResponse>(this.getURL(TaskRoutes.assignTask), {
      title: title,
      arTitle: arTitle,
      description: description,
      arDescription: arDescription,
      employeeId: employeeId
    });
  }

  GetUnseenTasksCount() {
    return this.httpClient.get<number>(this.getURL(TaskRoutes.getUnseenTasksCount));
  }

  GetMyTasks(page = 1, limit = 12, keywords = "") {
    let url = `${this.getURL(TaskRoutes.getMyTasks)}?page=${page}&limit=${limit}&keyword=${keywords}`;
    return this.httpClient.get<UserTasks>(url);
  }
  UpdateTaskStatus(taskId: number, status: number) {
    let body = {
      taskId: taskId,
      state: status
    }
    return this.httpClient.put<RegularRes>(this.getURL(TaskRoutes.updateTakeStatus), body);
  }
  UpdateTasksGrade(taskId: number, status: number) {
    let body = {
      taskId: taskId,
      state: status
    }
    return this.httpClient.put<RegularRes>(this.getURL(TaskRoutes.updateTaskGrade), body);
  }

  GetEmployeeGradedTasks(employeeId: number, status: number) {
    let url = `${this.getURL(TaskRoutes.getEmployeesGradedTask)}employeeId=${employeeId}&state=${status}`;
    return this.httpClient.get<[task]>(url);
  }
  UpdateTaskRequestedChanges(body: { taskId: number | undefined, employeeId: number | undefined | null, changes: string | undefined | null, arChanges: string | undefined | null }) {
    return this.httpClient.put<RegularRes>(this.getURL(TaskRoutes.updateTaskRequestedChanges), body);
  }
}
enum TaskRoutes {
  assignTask = "/Task",
  getMyTasks = "/Task",
  updateTakeStatus = "/Task/State",
  updateTaskGrade = "/Task/Grade",
  getEmployeeTasks = "/Task/",
  getTasksByTaskStatus = "/Task/State/",
  getUnseenTasksCount = "/Task/UnseenCount",
  getEmployeesGradedTask = "/Task/State?",
  updateTaskRequestedChanges = "/Task/RequestChanges"
}