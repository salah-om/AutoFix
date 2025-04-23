import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Authenticates user and generates access token
        Param: loginDto (LoginDto) -> DTO containing user email and password
        Postcondition: Returns authentication token and user details if valid,
                       otherwise throws UnauthorizedException
      ----------------------------------------------------------------------------------
    */
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Registers a new user and returns authentication token
        Param: signUpDto (SignUpDto) -> DTO containing user registration details
        Postcondition: Returns authentication token upon successful signup
      ----------------------------------------------------------------------------------
    */
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}