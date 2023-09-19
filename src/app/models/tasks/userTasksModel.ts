import { staffMember } from "../staff/userTeamRes"

export type PageInfo = {
    next: number | null,
    previous: number | null,
    current: number,
    pagesCount: number
}
export type taskStaffMemeber = staffMember;
export type task = {
    id: number,
    title: string,
    description: string,
    status: number,
    staffMember: taskStaffMemeber,
    grade: number | null,
    createdAt: string,
    lastStateChange: string
  }

export type UserTasks = {
    callerId: number,
    pageInfo: PageInfo,
    tasksList: [task]
}


