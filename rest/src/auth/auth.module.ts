import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        UserModule, 
        PassportModule.register({ defaultStrategy: 'jwt' }), 
        JwtModule.registerAsync({
            imports: [ConfigModule], 
            inject: [ConfigService], 
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), 
                signOptions: { expiresIn: '1h' }, 
            }),
        }),
        ConfigModule, 
    ],
    providers: [AuthService, JwtStrategy], 
    controllers: [AuthController], 
    exports: [AuthService, JwtModule, PassportModule], 
})
export class AuthModule { }