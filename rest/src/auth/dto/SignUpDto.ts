import { IsOptional } from "class-validator";

export class SignUpDto {
    username: string;
    email: string;
    password: string;
    @IsOptional()
    role: string;
}