import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

export class UpdateComplaintDto {

  user?: User;
  vehicle?: Vehicle;

  @IsString()
  issue?: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cost?: string;

  @IsOptional()
  @IsDate()
  date_reported?: Date;
}
