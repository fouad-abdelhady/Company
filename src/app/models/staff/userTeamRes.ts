export type UserTeamRes = {
    manager: staffMember,
    team: [
      staffMember
    ]
  }
  export type staffMember={
      id: number,
      name: string,
      email: string,
      role: string,
      image: string|null
  }