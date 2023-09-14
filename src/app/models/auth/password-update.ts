import { RegularRes } from "../common/regular"

export type PasswordUpdateReq = {
  oldPassword: string,
  newPassword: string
} 
export type PasswordUpdateRes = RegularRes;