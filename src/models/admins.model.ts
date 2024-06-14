/**
 * admin schema
 * @author jawad altaf
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'admin' })
  role: 'admin' | 'user';

  @Prop({ default: true })
  active: boolean;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
