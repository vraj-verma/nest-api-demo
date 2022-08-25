import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaType } from "mongoose";


// User-Schema
export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop({ unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

}
export const UserSchema = SchemaFactory.createForClass(User);



// Admin-Schema
export type AdminDocument = Admin & Document;
@Schema()
export class Admin {
    @Prop({ unique: true })
    name: string;

    @Prop()
    role:string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin)