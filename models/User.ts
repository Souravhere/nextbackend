import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser{
    email:string;
    password:string;
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}

const userSchema = new Schema<IUser>(
    {
        email:{type: String, required:true,unique:true},
        password:{type: String, required:true}
    },
    {timestamps:true}
)

userSchema.pre("save", async function(next) {
    if(this.isModified(this.password)){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// in this we will use the edge concept of the next js if model is present that we will used it othe ways created it
const User = models?.User || model<IUser>("User", userSchema)

export default User;