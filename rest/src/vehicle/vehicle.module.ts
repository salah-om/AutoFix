import { Module } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';

@Module({
 imports: [TypeOrmModule.forFeature([Vehicle])],
 controllers: [VehicleController],
 providers: [VehicleService],
 exports: [VehicleService],
})
export class VehicleModule {}
