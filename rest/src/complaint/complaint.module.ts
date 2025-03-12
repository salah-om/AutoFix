import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './complaint.entity';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { UserModule } from 'src/user/user.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';


@Module({
  imports: [TypeOrmModule.forFeature([Complaint]),
            UserModule,
            VehicleModule,
          ],
  controllers: [ComplaintController],
  providers: [ComplaintService],
  exports: [ComplaintService],
})
export class ComplaintModule {}
