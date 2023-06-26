import fs from 'fs'
import path from 'path'
import {format} from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { NextFunction } from 'express'

const logEvents =async (message:string, logName:string): Promise <void> => {
  const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n}`

  try {
    await fs.promises.stat(path.join(__dirname, '..', 'logs'))
  } catch (err:any) {
    if(err.code == 'ENOENT') {
      await fs.promises.mkdir(path.join(__dirname, '..', 'logs'))
    } else {
      console.error(err)
      return
    }
  }

  try {
    await fs.promises.appendFile(path.join(__dirname, '..', 'logs',logName), logItem)
  } catch (err) {
    console.error(err)
  }
}

const logger = (req:Request, res:Response, next: NextFunction):void =>{
  logEvents(`${req.method}\t${(req.headers as any).origin}\t${req.url}`, 'reqLog.txt')
  console.log(`${req.method} ${(req as any).path}`)
  next()
}
/* 
This is needed because the origin property is not part of the standard Headers type, and path is not part of the standard Request type. By using a type assertion, we can access these properties without TypeScript throwing an error.

In general, it's best to avoid using any as much as possible because it bypasses TypeScript's type checking, potentially leading to runtime errors that could have been caught at compile time. However, there are cases where using any is necessary or unavoidable, such as when dealing with third-party libraries or APIs that aren't typed correctly or consistently. In such cases, using any allows you to bypass TypeScript's type checking and work with the data as needed.

*/
export {logger, logEvents}