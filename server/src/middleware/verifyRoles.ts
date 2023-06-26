import { Response, NextFunction, RequestHandler } from "express";
import { RequestWithRoles } from "./types";

const verifyRoles = (...allowedRoles:number[]): RequestHandler =>{
  return (req:RequestWithRoles, res:Response, next:NextFunction) =>{
    if(!req.roles) return res.sendStatus(401)
    const result:boolean = req.roles.some((role:number)=>allowedRoles.includes(role))
    if(!result) return res.sendStatus(401)
    next()
  }
}

export default verifyRoles