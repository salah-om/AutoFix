import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';


@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehiclesRepository: Repository<Vehicle>,
      ) {}
    
      create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        return this.vehiclesRepository.save(createVehicleDto);
      }
    
      async findAll(): Promise<Vehicle[]> {
        return this.vehiclesRepository.find();
      }
    
      async findOne(id: number): Promise<Vehicle | null> {
        return this.vehiclesRepository.findOneBy({ id: id });
      }
    
      async getDistinctMakes(): Promise<string[]> {
        const makes = await this.vehiclesRepository
          .createQueryBuilder("vehicle")
          .select("DISTINCT vehicle.make", "make")
          .getRawMany();
    
        return makes.map((item) => item.make);
      }

      async update(id: number, updatedVehicle: UpdateVehicleDto): Promise<Vehicle>{
        const Vehicle = await this.vehiclesRepository.findOneBy({ id });
        if (!Vehicle) {
          throw new Error('Vehicle not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(Vehicle, updatedVehicle); 
        return this.vehiclesRepository.save(Vehicle);
      }

      async delete(id: number): Promise<void> {
        await this.vehiclesRepository.delete(id);
      }
}
