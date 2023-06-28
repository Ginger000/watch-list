import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../model/User";
import { IUser } from "../model/types";

/* 
However, in the case of your function registerNewUser, it doesn't explicitly return anything. So what does it return? When you don't return anything from a function, it implicitly returns undefined in JavaScript. And since an async function wraps its return value in a Promise, your function is actually returning a Promise that resolves to undefined.

*/
const registerNewUser = async (req:Request, res:Response): Promise<void> =>{
  console.log('in register controller')
  const {user, pwd} = req.body
  if(!user || !pwd){
    res.status(400).json({'message':'Username and password are required.' })
    return
  }
  // check for duplicate usernames in the db
  const duplicate:IUser | null = await User.findOne({username:user}).exec()
  if(duplicate){
    res.sendStatus(409)
    return
  }

  try{
    //encrypt the password
    const hashedPwd:string = await bcrypt.hash(pwd, 10)
    //create and store the new user
    const result:IUser = await User.create({
      'username':user,
      'password':hashedPwd
    })

    console.log(result)
    res.status(201).json({ 'success': `New user ${user} created!` })
  } catch (err:unknown){
    if(err instanceof Error) 
    res.status(500).json({ 'message': err.message });
    else res.status(500).json({ 'message': 'An unknown error occurred' });
  }
}


export {registerNewUser}