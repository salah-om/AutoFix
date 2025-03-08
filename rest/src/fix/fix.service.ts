import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fix } from './fix.entity';
import { Repository } from 'typeorm';
import { CreateFixDto } from './dto/create-fix.dto';
import { UpdateFixDto } from './dto/update-fix.dto';

@Injectable()
export class FixService {
    constructor(
        @InjectRepository(Fix)
        private readonly fixesRepository: Repository<Fix>,
      ) {}
    
      create(createFixDto: CreateFixDto): Promise<Fix> {
        return this.fixesRepository.save(createFixDto);
      }
    
      async findAll(): Promise<Fix[]> {
        return this.fixesRepository.find();
      }
    
      async findOne(id: number): Promise<Fix | null> {
        return this.fixesRepository.findOneBy({ id: id });
      }
    
      async update(id: number, updatedFix: UpdateFixDto): Promise<Fix>{
        const Fix = await this.fixesRepository.findOneBy({ id });
        if (!Fix) {
          throw new Error('Fix not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(Fix, updatedFix); 
        return this.fixesRepository.save(Fix);
      }

      async delete(id: number): Promise<void> {
        await this.fixesRepository.delete(id);
      }
}
