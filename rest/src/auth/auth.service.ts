import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/SignUpDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Validates user credentials by checking email and password match
        Param: 
          - email (string) -> User email
          - pass (string) -> User password
        Return: User object without password if validation is successful, otherwise null
      ----------------------------------------------------------------------------------
    */
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { email } });
        
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Authenticates user and generates JWT token upon successful login
        Param: 
          - email (string) -> User email
          - password (string) -> User password
        Return: Object containing access token and authenticated user details
      ----------------------------------------------------------------------------------
    */
    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Registers a new user and returns generated authentication token
        Param: signUpDto (SignUpDto) -> DTO containing user registration details
        Return: Object containing authentication token for newly registered user
      ----------------------------------------------------------------------------------
    */
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, email, password, role} = signUpDto;
        console.log(username, email, password, role);
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.usersRepository.save({
            username, 
            email, 
            password: hashedPassword,
            role
        });
    
        const token = this.jwtService.sign({ id: user.id });
    
        return { token };
      }
}