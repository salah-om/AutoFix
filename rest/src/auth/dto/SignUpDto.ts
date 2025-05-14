import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SignUpDto {
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
            description: 'Password must be strong'
    })
    password: string;
    
    @IsOptional()
    role: string;
}