import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

export class UpdateComplaintDto {

  @ApiProperty({
            description: 'User Object',
            type: User
  })
  user?: User;

  @ApiProperty({
            description: 'Vehicle Object',
            type: Vehicle
  })
  vehicle?: Vehicle;

  @IsString()
  @ApiProperty({
            description: 'Complaint issue',
            example: 'Transmission Failure'
  })
  issue?: string;

  @IsString()
  @ApiProperty({
            description: 'Complaint Description',
            example: 'While I was driving at 60 km/h, the transmission failed.'
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
            description: 'Cost of issue',
            example: '$450'
  })
  cost?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
            description: 'Date reported',
            example: '6-5-2024'
  })
  date_reported?: Date;
}
