import { NextRequest, NextResponse } from "next/server";
import { connectionToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json()
        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password is required"},
                {status:400}
            )
        }
        await connectionToDB()
        // Check user is email is allready registred in the db
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {error: "Email is all ready registered"},
                {status:400}
            )
        }

        // create new user
        await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message: "User registered successfully"},
            {status:201}
        )

    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {error: "Failed registered a user"},
            {status:500}
        )
    }
}