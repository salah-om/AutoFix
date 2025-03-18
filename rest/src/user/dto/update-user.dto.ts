import { IsOptional, IsString, IsEmail } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString()  
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;
}