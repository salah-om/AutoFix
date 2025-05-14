import { ApiProperty } from "@nestjs/swagger";

export class CreateComplaintDto {
      @ApiProperty({
            description: 'Valid vehicle id',
            example: '1'
      })
      vehicleId: number;

      @ApiProperty({
            description: 'Complaint issue',
            example: 'Transmission Failure'
      })
      issue: string;

      @ApiProperty({
            description: 'Complaint Description',
            example: 'While I was driving at 60 km/h, the transmission failed.'
      })
      description: string;

      @ApiProperty({
            description: 'Cost of issue',
            example: '$450'
      })
      cost: string;
}
