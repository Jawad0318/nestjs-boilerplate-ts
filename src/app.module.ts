import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './Injectors/admin.service';
import { AdminModule } from './modules/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb+srv://falcon_consulting:SdhAGgILmNvLvEpo@dev.mhkzr1l.mongodb.net/<Project-Name>?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
