import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
            description: 'Email must be valid',
            example: 'johndoe413@gmail.com'
    })
    email: string;
    
    @ApiProperty({
            description: 'Password must be correct'
    })
    password: string;
}