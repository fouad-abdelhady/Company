import { PageInfo } from "../common/pageInfo";
import { staffMember } from "../staff/userTeamRes";


export type PaginatedNotificationsRes = {
    pageInfo: PageInfo,
    notifications: [NotificationItem]
}
export type NotificationItem = {
    id: number;
    title: string;
    arTitle: string;
    description: string;
    arDescription: string;
    taskTitle: string;
    taskId: number;
    status: number,
    poster: staffMember;
    createdAt: string;
    seenAt: string;
};
  
  
  
  
  
  