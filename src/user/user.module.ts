/**
 * Decorator for organizing the user structure
 * @author jawad altaf
 */
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { FileService } from 'src/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dA47Xd^l%Ar57Xd^l%AXd^l%Ar',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [UserService, FileService],
  controllers: [UserController],
})
export class UserModule {}
