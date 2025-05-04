import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please add the MONGODB_URI in the .env")
}

// types defined in the types.d.ts
let cached = global.mongoose;

// if cached is not present then we will create it
if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

// db connection function
export async function connectionToDB(){
    // If we already have a connection, return it
    if(cached.conn){
        return cached.conn;
    }
    
    // If a connection promise doesn't exist yet, create one
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection);
    }
    
    try {
        // Wait for the connection
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    
    return cached.conn;
}