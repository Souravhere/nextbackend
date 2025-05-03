import { promises } from "dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // in this '!' to make sure that the mogodb are present 

if(!MONGODB_URI){
    throw new Error("Please add the MONGODB_URI in the .env")
}

// types defined in the types.d.ts
let cached = global.mongoose;

// if cached is not present than we will created | if our next is not run on any 'edge'
if(!cached){
    cached = global.mongoose = {conn:null, promise:null};
}

// db connection function 

export async function connectionToDB(){
    if(!cached.conn){
        return cached.conn
    }
    // if we not able to find the promise that will we will create own promise
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
    cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then(()=> mongoose.connection);
    }

    try {
        // wait for the connection
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error 
    }

    return cached.conn;
}