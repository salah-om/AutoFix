import { IsOptional, IsString, IsEmail } from 'class-validator';
export class UpdateVehicleDto {
  @IsOptional()
  @IsString()  
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  year?: string;
}