/* 
Yes, the user and roles information is often encoded into the JWT token. However, in many web applications, a common practice is to decode this information in a middleware function and attach it to the req object. This makes the data easily accessible to subsequent middleware functions and route handlers, so they don't have to decode the token again.
 */

import jwt from 'jsonwebtoken'
import { Response, NextFunction} from 'express'
import {RequestWithRoles, UserInfo} from './types'

const verifyJWT = async (req:RequestWithRoles, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  console.log(token)
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as UserInfo
    req.user = decoded.user
    req.roles = decoded.roles
    next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

export default verifyJWT