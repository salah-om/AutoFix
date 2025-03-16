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

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });
        
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, email, password} = signUpDto;
        console.log(username, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.usersRepository.save({
            username, 
            email, 
            password: hashedPassword
        });
    
        const token = this.jwtService.sign({ id: user.id });
    
        return { token };
      }
}