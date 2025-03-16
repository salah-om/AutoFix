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
        TypeOrmModule.forFeature([User]), // Register User entity for use with TypeOrm
        UserModule, // Import UsersModule if needed for user-related logic
        PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport JWT strategy
        JwtModule.registerAsync({
            imports: [ConfigModule], // Ensure ConfigModule is imported for async factory
            inject: [ConfigService], // Inject ConfigService to access environment variables
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Fetch the secret key from environment
                signOptions: { expiresIn: '1h' }, // Set expiration time for JWT
            }),
        }),
        ConfigModule, // Import ConfigModule to load environment variables
    ],
    providers: [AuthService, JwtStrategy], // Register JwtStrategy and AuthService
    controllers: [AuthController], // Register AuthController
    exports: [AuthService, JwtModule, PassportModule], // Export services for use in other modules
})
export class AuthModule { }