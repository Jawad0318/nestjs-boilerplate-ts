import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import { CreateUser } from './user-dto';
const BCRYPT_SALT = process.env.BCRYPT_SALT || 10;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   *create methode to create the user
   * @body
   * @returns  user && token
   */
  async create(
    body: CreateUser,
    photo: string,
  ): Promise<{ user: User; token: string }> {
    try {
      const existinguser = await this.userModel.findOne({ email: body.email });
      // check user exist
      if (existinguser) {
        throw new ConflictException('Already exist', {
          cause: new Error(),
          description: 'the given email is already in use',
        });
      }
      body.photo = photo;
      // encrypting the password
      body.password = bcrypt.hashSync(body.password, BCRYPT_SALT);
      // creating user in db
      const user = await this.userModel.create(body);
      // user payload
      const payload = { user };
      // jwt token  for auth
      const token = await this.jwtService.signAsync(payload);
      return { user, token };
    } catch (err) {
      console.log('----------->', err);

      return err;
    }
  }
  /**
   * findAll methode to get all the user
   * @returns user[]
   */
  async findAll(): Promise<User[]> {
    // get all user from the db
    try {
      const users = await this.userModel.find({}, { password: 0 });
      return users;
    } catch (err) {
      console.log('----------->', err);
      return err;
    }
  }

  /**
   * findById methode to find the single user
   * @param userId
   * @returns user
   */
  async findById(userId: string): Promise<User> {
    // geting user by id
    try {
      const user = await this.userModel.findById({ userId, password: 0 });
      return user;
    } catch (err) {
      console.log('----------->', err);
      return err;
    }
  }
  /**
   * updateUser methode to update the user
   * @param userId
   * @param body
   * @returns
   */
  async updateUser(
    userId: string,
    body: CreateUser,
    photoPath: string,
  ): Promise<User> {
    // updating the user
    try {
      // if user want to update his passsword

      if (body.password) {
        body.password = bcrypt.hashSync(body.password, BCRYPT_SALT);
      }
      body.photo = photoPath;
      const user = await this.userModel.findByIdAndUpdate(userId, body, {
        new: true,
      });

      return user;
    } catch (err) {
      console.log('------->', err);
      return err;
    }
  }
  async deleteUser(userId: string): Promise<User> {
    //deleting the user
    try {
      const user = await this.userModel.findByIdAndDelete(userId);
      return user;
    } catch (err) {
      console.log('------->', err);
      return err;
    }
  }
}
