/**
 * proviers auth functionalities and bussiness logic
 * @author jawad altaf
 */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { changePassword, login } from './auth-dto';
import { User } from 'src/models/user.model';
import { UserModule } from 'src/user/user.module';
import mongoose from 'mongoose';
const BCRYPT_SALT = process.env.BCRYPT_SALT;
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}
  /**
   *  login methode
   * @param body
   * @returns
   */
  async login(body: login): Promise<{ user: User; token: string }> {
    try {
      const user = await this.userModel.findOne({ email: body.email });
      // if the mail does not exist in any account
      if (!user) {
        throw new NotFoundException('Mail does not exist', {
          cause: new Error(),
          description: 'The given email does not exist',
        });
      }
      const isMatched = bcrypt.compare(user.password, body.password);
      // check if the password is not correct
      if (!isMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }
      // deleting password from the object
      delete user.password;
      const payload = { user };
      // creating token
      const token = await this.jwtService.signAsync(payload);
      return { user, token };
    } catch (err) {
      console.log('----------->', err);
      return err;
    }
  }
  /**
   * change password
   * @param userId
   * @param body
   * @returns
   */
  async changePassword(userId: string, body: changePassword): Promise<User> {
    try {
      // finding user
      const user = await this.userModel.findById(userId);
      // if user does not found
      if (!user) {
        throw new NotFoundException('User does not exist', {
          cause: new Error(),
          description: 'User not found',
        });
      }
      // if new password is not equal to confirm password
      if (body.newPassword !== body.confirmPassword) {
        throw new UnauthorizedException('Confirm password and new password are not same');
      }
      // checking the old password
      const isMatched = bcrypt.compare(body.oldPassword, user.password);
      if (!isMatched) {
        throw new UnauthorizedException('Invalid Old password');
      }
      // saving the new password
      user.password = bcrypt.hashSync(body.newPassword, BCRYPT_SALT);
      await user.save();
      return user;
    } catch (err) {
      return err;
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      // finding user
      const user = await this.userModel.findOne({ email });
      // if user does not found
      if (!user) {
        throw new NotFoundException('User does not exist', {
          cause: new Error(),
          description: 'User not found',
        });
      }
      const randomopassword = Math.floor(1000 + Math.random() * 9000);
      return { message: 'Password reset initiated successfully' };
    } catch (err) {
      return err;
    }
  }
}
