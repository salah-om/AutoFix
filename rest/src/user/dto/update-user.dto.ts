import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';
export class UpdateUserDto {

  @IsOptional()
  @IsString()
  @ApiProperty({
        description: 'Username must be unique',
        example: 'johndoe413'
    })  
  username?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
        description: 'Email must be valid',
        example: 'johndoe413@gmail.com'
    })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
        description: 'The password of the User'
  })
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
