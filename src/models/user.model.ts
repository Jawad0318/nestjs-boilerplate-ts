/**
 * user schema
 * @author jawad altaf
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 8, trim: true })
  password: string;

  @Prop({ required: true })
  phone: number;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  photo: string;

  @Prop({ enum: ['male', 'female', 'others'], default: 'male' })
  gender: 'male' | 'female' | 'others';

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';
}
export const UserSchema = SchemaFactory.createForClass(User);
