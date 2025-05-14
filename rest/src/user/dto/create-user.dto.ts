import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Username must be unique',
        example: 'johndoe413'
    })
    username: string;

    @ApiProperty({
        description: 'Email must be valid',
        example: 'johndoe413@gmail.com'
    })
    email: string;

    @ApiProperty({
        description: 'The password of the User',
        example: 'CarWebsite@3142'
    })
    password: string;
    role: string;
}