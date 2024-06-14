/**
 * user dto / body handler for request
 * @author jawad altaf
 */
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';
export class CreateUser {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  password: string;
  @IsNumber()
  readonly phone: number;
  @IsString()
  @IsOptional()
  readonly address: string;
  @IsString()
  @IsOptional()
  readonly city: string;
  @IsString()
  @IsOptional()
  readonly country: string;
  @IsOptional()
  photo: string;
  @IsString()
  @IsOptional()
  gender: 'male' | 'female' | 'others';
  @IsString()
  @IsOptional()
  role: 'user' | 'admin';
}
