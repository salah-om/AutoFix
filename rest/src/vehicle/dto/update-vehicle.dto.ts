import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
            description: 'Car Make/Brand',
            example: 'Toyota'
  })  
  make?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
            description: 'Car Model',
            example: 'Yaris'
  })
  model?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
            description: 'Car Model Year',
            example: '2005'
  })
  year?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
            description: 'Valid image path',
            example: 'yaris.png'
  })
  imgurl?: string;
}
