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
import { FixModule } from 'src/fix/fix.module';
import { Fix } from 'src/fix/fix.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Vehicle, Complaint, Fix]), 
    UserModule, 
    VehicleModule, 
    ComplaintModule,
    FixModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashModule {}
