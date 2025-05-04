import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectionToDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials :{
                email:{lable : "Email",  type: "text"},
                password:{lable: "Password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing email or password")
                }

                try {
                    await connectionToDB()
                    const user = await User.findOne({email:credentials.email});
                    if(!user){
                        throw new Error("No User Found");
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if(!isValid){
                        throw new Error("Invalid Password");
                    }

                    return{
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch (error) {
                    throw error
                }
            }
        })
    ]
}
