import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { Vehicle } from './vehicle/vehicle.entity';
import { FixController } from './fix/fix.controller';
import { FixService } from './fix/fix.service';
import { FixModule } from './fix/fix.module';
import { Fix } from './fix/fix.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'autofix',
      entities: [User, Vehicle, Fix],
      synchronize: true, 
    }),
    UserModule,
    VehicleModule,
    FixModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
