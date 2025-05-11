import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fix } from './fix.entity';
import { Repository } from 'typeorm';
import { CreateFixInput } from './dto/create-fix.input';
import { UpdateFixInput } from './dto/update-fix.input';

@Injectable()
export class FixService {
    constructor(
        @InjectRepository(Fix)
        private readonly fixesRepository: Repository<Fix>,
      ) {}
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new fix entry
        Param:
          - CreateFixInput (CreateFixInput) -> DTO containing fix details
        Return: Newly created fix entry
      ----------------------------------------------------------------------------------
      */
      create(CreateFixInput: CreateFixInput): Promise<Fix> {
        return this.fixesRepository.save(CreateFixInput);
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all fix records
        Return: Array of fix records
      ----------------------------------------------------------------------------------
      */
      async findAll(): Promise<Fix[]> {
        return this.fixesRepository.find();
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific fix entry by ID
        Param: id (number) -> Fix ID
        Return: Fix entry if found, otherwise null
      ----------------------------------------------------------------------------------
      */
      async findOne(id: number): Promise<Fix | null> {
        return this.fixesRepository.findOneBy({ id: id });
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing fix record
        Param:
          - id (number) -> Fix ID
          - updatedFix (UpdateFixInput) -> DTO containing updated fix details
        Return: Updated fix entry if successful
      ----------------------------------------------------------------------------------
      */
      async update(id: number, updatedFix: UpdateFixInput): Promise<Fix>{
        const Fix = await this.fixesRepository.findOneBy({ id });
        if (!Fix) {
          throw new Error('Fix not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(Fix, updatedFix); 
        return this.fixesRepository.save(Fix);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a fix entry
        Param: id (number) -> Fix ID
        Postcondition: Fix entry is removed from the database
      ----------------------------------------------------------------------------------
      */
      async delete(id: number): Promise<void> {
        await this.fixesRepository.delete(id);
      }
}
