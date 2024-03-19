import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/models/admins.model';
import { CreateAdmin } from './admin-dto';
const BCRYPT_SALT = process.env.BCRYPT_SALT || 10;
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: mongoose.Model<Admin>,
    private jwtService: JwtService,
  ) {}

  /**
   *create methode to create the admin
   * @body
   * @returns  user && token
   */
  async register(body: CreateAdmin): Promise<{ admin: Admin; token: string }> {
    try {
      const existinguser = await this.adminModel.findOne({ email: body.email });
      // check user exist
      if (existinguser) {
        throw new ConflictException('Already exist', {
          cause: new Error(),
          description: 'The given email is already in use',
        });
      }
      // encrypting the password
      body.password = bcrypt.hashSync(body.password, BCRYPT_SALT);
      // creating user in db
      const admin = await this.adminModel.create(body);
      // user payload
      const payload = { admin };
      // jwt token  for auth
      const token = await this.jwtService.signAsync(payload);
      return { admin, token };
    } catch (err) {
      console.log('----------->', err);
      return err;
    }
  }
  /**
   * login admin
   * @returns admin
   */
  async login(body): Promise<{ admin: Admin; token: string }> {
    // get all user from the db
    try {
      const admin = await this.adminModel.findOne({ body.email });
      if (!admin) {
        throw new NotFoundException('Mail does not exist', {
          cause: new Error(),
          description: 'The given email does not exist',
        });
      }
      const isMatched = bcrypt.compare(admin.password, body.password);
      if (!isMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }
      delete admin.password;
      const payload = { admin };
      const token = await this.jwtService.signAsync(payload);

      return { admin, token };
    } catch (err) {
      console.log('----------->', err);
      return err;
    }
  }
}
