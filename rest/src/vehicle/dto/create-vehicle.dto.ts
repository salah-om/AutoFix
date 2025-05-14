import { ApiProperty } from "@nestjs/swagger";

export class CreateVehicleDto {
    @ApiProperty({
            description: 'Car Make/Brand',
            example: 'Toyota'
    })
    make: string;

    @ApiProperty({
            description: 'Car Model',
            example: 'Yaris'
    })
    model: string;

    @ApiProperty({
            description: 'Car Model Year',
            example: '2005'
    })
    year: string;

    @ApiProperty({
            description: 'Valid image path',
            example: 'yaris.png'
    })
    imgurl: string;
}