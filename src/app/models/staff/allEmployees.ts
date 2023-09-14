import { staffMember } from "./userTeamRes"

export type AllEmployeesRes = {
  nextPage: number|null,
  previousPage: number|null,
  currentPage: number|null,
  totalPages: number|null,
  staffMembers: [
      staffMember
  ]
}