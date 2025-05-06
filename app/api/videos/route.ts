import { connectionToDB } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectionToDB()
        const videos = await Video.find({}).sort({createdAt: -1}).lean()
        if(!videos){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            {error:"Fails to Load Videso"},
            {status:200}
        )
    }
}