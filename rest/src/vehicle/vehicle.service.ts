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

      async getModelsByMake(make: string): Promise<string[]> {
        const result = await this.vehiclesRepository
        .createQueryBuilder("vehicle")
        .select("DISTINCT vehicle.model","model")
        .where("vehicle.make = :make", { make })
        .getRawMany();
          
        return result.map((v) => v.model);
      }

      async getYearsByMakeAndModel(make: string, model: string): Promise<string[]> {
        const result = await this.vehiclesRepository
        .createQueryBuilder("vehicle")
        .select("DISTINCT vehicle.year","year")
        .where("vehicle.make = :make", { make })
        .andWhere("vehicle.model = :model", { model })
        .getRawMany();
          
        return result.map((v) => v.year);
      }
      
      async findByMakeModelYear(make?: string, model?: string, year?: string): Promise<Vehicle[]> {
        const query = this.vehiclesRepository.createQueryBuilder("vehicle");
        
        if (make) query.andWhere("vehicle.make = :make", { make });
        if (model) query.andWhere("vehicle.model = :model", { model });
        if (year) query.andWhere("vehicle.year = :year", { year });
        
        return query.getMany();
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
