import mongoose, {Schema} from "mongoose";
import { IWatchList } from "./types";



const watchListSchema = new Schema<IWatchList>({
  list:{
    type:[[String]],
    default:[]
  }
})

export const WatchList = mongoose.model<IWatchList>('WatchList', watchListSchema)