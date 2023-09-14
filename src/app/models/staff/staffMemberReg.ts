import { staffMember } from "./userTeamRes"

export type StaffMemberRegRes = staffMember
export type StaffMemberRegReq = {
    fullName: string,
    email: string,
    salary: number,
    role: string,
    image: string|null,
    userName: string,
    initPassword: string,
    managerId: number|null
  }
