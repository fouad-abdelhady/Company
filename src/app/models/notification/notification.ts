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
    poster: staffMember;
    createdAt: string;
};
  
  
  
  
  
  