import {Request} from 'express'

export interface UserInfo {
  user?:string, 
  roles?:number[]
}

export interface RequestWithRoles extends Request, UserInfo {}