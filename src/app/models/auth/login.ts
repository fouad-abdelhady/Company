export type LoginRes ={
        id:number,
        fullName: string,
        role: string,
        email: string,
        accessToken: string,
        image: string|null
}
export type LoginReq = {
        userName: string,
        password: string
}