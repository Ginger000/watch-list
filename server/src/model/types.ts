import { Document } from "mongoose";

export interface IWatchList extends Document {
  list:string[][]
}

export interface IUser extends Document {
  username:string;
  roles:{
    User:number;
    Eidtor?:number;
    Admin?:number
  }
  password:string;
  refreshToken?:string;
  watchList:IWatchList['_id']
}

