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
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new vehicle entry
        Param:
          - createVehicleDto (CreateVehicleDto) -> DTO containing vehicle details
        Return: Newly created vehicle entry
      ----------------------------------------------------------------------------------
      */
      create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        return this.vehiclesRepository.save(createVehicleDto);
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all vehicles
        Return: Array of vehicle records
      ----------------------------------------------------------------------------------
      */
      async findAll(): Promise<Vehicle[]> {
        return this.vehiclesRepository.find();
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific vehicle entry by ID
        Param: id (number) -> Vehicle ID
        Return: Vehicle entry if found, otherwise null
      ----------------------------------------------------------------------------------
      */
      async findOne(id: number): Promise<Vehicle | null> {
        return this.vehiclesRepository.findOneBy({ id: id });
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct vehicle makes from the database
        Return: Array of unique vehicle makes
      ----------------------------------------------------------------------------------
      */
      async getDistinctMakes(): Promise<string[]> {
        const makes = await this.vehiclesRepository
          .createQueryBuilder("vehicle")
          .select("DISTINCT vehicle.make", "make")
          .getRawMany();
    
        return makes.map((item) => item.make);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct models for a given vehicle make
        Param: make (string) -> Vehicle make
        Return: Array of unique models for the given make
      ----------------------------------------------------------------------------------
      */
      async getModelsByMake(make: string): Promise<string[]> {
        const result = await this.vehiclesRepository
        .createQueryBuilder("vehicle")
        .select("DISTINCT vehicle.model","model")
        .where("vehicle.make = :make", { make })
        .getRawMany();
          
        return result.map((v) => v.model);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct years for a given vehicle make and model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Return: Array of unique years for the given make and model
      ----------------------------------------------------------------------------------
      */
      async getYearsByMakeAndModel(make: string, model: string): Promise<string[]> {
        const result = await this.vehiclesRepository
        .createQueryBuilder("vehicle")
        .select("DISTINCT vehicle.year","year")
        .where("vehicle.make = :make", { make })
        .andWhere("vehicle.model = :model", { model })
        .getRawMany();
          
        return result.map((v) => v.year);
      }
      
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Finds vehicles based on optional make, model, and year filters
        Param:
          - make (string | undefined) -> Optional vehicle make filter
          - model (string | undefined) -> Optional vehicle model filter
          - year (string | undefined) -> Optional vehicle year filter
        Return: Array of vehicles matching the specified criteria
      ----------------------------------------------------------------------------------
      */
      async findByMakeModelYear(make?: string, model?: string, year?: string): Promise<Vehicle[]> {
        const query = this.vehiclesRepository.createQueryBuilder("vehicle");
        
        if (make) query.andWhere("vehicle.make = :make", { make });
        if (model) query.andWhere("vehicle.model = :model", { model });
        if (year) query.andWhere("vehicle.year = :year", { year });
        
        return query.getMany();
      }
      

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing vehicle record
        Param:
          - id (number) -> Vehicle ID
          - updatedVehicle (UpdateVehicleDto) -> DTO containing updated vehicle details
        Return: Updated vehicle entry if successful
      ----------------------------------------------------------------------------------
      */
      async update(id: number, updatedVehicle: UpdateVehicleDto): Promise<Vehicle>{
        const Vehicle = await this.vehiclesRepository.findOneBy({ id });
        if (!Vehicle) {
          throw new Error('Vehicle not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(Vehicle, updatedVehicle); 
        return this.vehiclesRepository.save(Vehicle);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a vehicle entry
        Param: id (number) -> Vehicle ID
        Postcondition: Vehicle entry is removed from the database
      ----------------------------------------------------------------------------------
      */
      async delete(id: number): Promise<void> {
        await this.vehiclesRepository.delete(id);
      }
}
