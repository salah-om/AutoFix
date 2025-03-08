import { IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  imgurl?: string;
}