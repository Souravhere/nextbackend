import { authOptions } from "@/lib/auth";
import { connectionToDB } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
            {error:"Fails to Load Videos"},
            {status:200}
        )
    }
}

export async function POST(request: NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"Unauthorized"}, {status: 4001})
        }

        await connectionToDB()
        // get the body data 
        const body:IVideo = await request.json()
        if(!body.title || !body.description || !body.videoUrl || !body.thumnailUrl){
            return NextResponse.json({error:"Missing Required Vidos Data"}, {status:400 })
        }
        const videodata = {
            ...body,
            contorls : body.controls ?? true,
            transformations:{
                height:1920,
                width:1080,
                quality: body.transformation?.quality ?? 100
            }
        }

        const newvideo = await Video.create(videodata)
        return NextResponse.json(newvideo)

    } catch (error) {
        return NextResponse.json(
            {error:"Fails to create a video"},
            {status:200}
        ) 
    }
}