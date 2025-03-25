import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../user/user.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Complaint } from '../complaint/complaint.entity';
import { UserModule } from '../user/user.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ComplaintModule } from '../complaint/complaint.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Vehicle, Complaint]), 
    UserModule, 
    VehicleModule, 
    ComplaintModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashModule {}
