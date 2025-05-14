import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


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
    @ApiOkResponse({
          description: 'User Logged in',
          schema: {
           example: { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGFoLm9tY0BnbWFpbC5jb20iLCJzdWIiOjQsImlhdCI6MTc0NzIyODEzOCwiZXhwIjoxNzQ3MjMxNzM4fQ.s62nDJEaCq1ulQxE8iumge8BLxmdwk4tTV-yJZX5xyE",
                            "user": {
                            "id": 4,
                            "username": "salah",
                            "email": "salah.omc@gmail.com",
                            "role": "Visitor"
    } }
        }
        })
    @ApiUnauthorizedResponse({
          description: 'Invalid Credentials. User could not login',
          schema: {
            example: { message: 'Invalid Credentials',
                       error: "Unauthorized"
             }
          }
    })
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
    @ApiOkResponse({
          description: 'User Signed up',
          schema: {
           example: { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGFoLm9tY0BnbWFpbC5jb20iLCJzdWIiOjQsImlhdCI6MTc0NzIyODEzOCwiZXhwIjoxNzQ3MjMxNzM4fQ.s62nDJEaCq1ulQxE8iumge8BLxmdwk4tTV-yJZX5xyE"}
        }
        })
    @ApiBadRequestResponse({
          description: 'User unable to sign up',
    })
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}