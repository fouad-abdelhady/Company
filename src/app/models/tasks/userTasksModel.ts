import { PageInfo } from "../common/pageInfo";
import { staffMember } from "../staff/userTeamRes"
export type taskStaffMemeber = staffMember;
export type task = {
    id: number,
    title: string,
    arTitle: string,
    description: string,
    arDescription: string,
    status: number,
    staffMember: taskStaffMemeber,
    grade: number | null,
    changes: string | null,
    createdAt: string,
    lastStateChange: string,
    arChanges: string | null
  }

export type UserTasks = {
    callerId: number,
    pageInfo: PageInfo,
    tasksList: [task]
}


