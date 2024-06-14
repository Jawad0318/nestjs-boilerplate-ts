/**
 * Admin controller for the handling the request and respone
 * @author jawad altaf
 */
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdmin, login } from './admin-dto';
import { Admin } from 'src/models/admins.model';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  /**
   * creating or singup
   * @param body
   * @returns
   */
  @Post('/create')
  async createUser(@Body() body: CreateAdmin): Promise<{ admin: Admin; token: string }> {
    return await this.adminService.register(body);
  }
  /**
   * getting all the user
   * @returns
   */
  @Get('/login')
  async login(@Body() body: login): Promise<{ admin: Admin; token: string }> {
    return await this.adminService.login(body);
  }
}
