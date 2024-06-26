/**
 * Admin dto / body handler for request
 * @author jawad altaf
 */

import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean } from 'class-validator';
export class CreateAdmin {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  role: 'user' | 'admin';
  @IsBoolean()
  readonly active: boolean;
}
export class login {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  password: string;
}
