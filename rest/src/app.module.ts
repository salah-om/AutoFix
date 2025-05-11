import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { Vehicle } from './vehicle/vehicle.entity';
import { FixModule } from './fix/fix.module';
import { Fix } from './fix/fix.entity';
import { ComplaintModule } from './complaint/complaint.module';
import { Complaint } from './complaint/complaint.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DashModule } from './dashboard/dashboard.module';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'autofix',
      entities: [User, Vehicle, Fix, Complaint],
      synchronize: true, 
    }),
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    AuthModule,
    VehicleModule,
    FixModule,
    ComplaintModule,
    DashModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
