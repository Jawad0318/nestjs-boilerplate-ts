/**
 * Decorator for organizing the admin structure
 * @author jawad altaf
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/models/admins.model';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dA47Xd^l%Ar57Xd^l%AXd^l%Ar',
      signOptions: { expiresIn: '8h' },
    }),
  ],

  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
