import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { UserService } from 'src/user/user.service';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class ComplaintService {
    constructor(
        @InjectRepository(Complaint)
        private readonly complaintsRepository: Repository<Complaint>,
        private readonly userService: UserService,
        private readonly vehicleService: VehicleService,
      ) {}
    
      async create(userId: number, createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        const { vehicleId, issue, description, cost } = createComplaintDto;

        const user = await this.userService.findOne(userId);
        const vehicle = await this.vehicleService.findOne(vehicleId);
      
        if (!user || !vehicle) {
          throw new Error('User or Vehicle not found!');
        }
      
        const complaint = this.complaintsRepository.create({
          user,
          vehicle,
          issue,
          description,
          cost,
        });
      
        return await this.complaintsRepository.save(complaint);
      }
      
    
      async findAll(): Promise<Complaint[]> {
        return this.complaintsRepository.find({
          relations: ['user', 'vehicle'], 
      });
      }
    
      async findOne(id: number): Promise<Complaint | null> {
        return this.complaintsRepository.findOneBy({ id: id });
      }

      async getWorstYear(make: string, model: string) {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .select('vehicle.year', 'year')
          .addSelect('COUNT(complaint.id)', 'count')
          .innerJoin('complaint.vehicle', 'vehicle')
          .where('vehicle.make = :make', { make })
          .andWhere('vehicle.model = :model', { model })
          .groupBy('vehicle.year')
          .orderBy('count', 'DESC')
          .limit(1)
          .getRawOne();
      }
      
      async getComplaintsByYear(make: string, model: string) {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .select('vehicle.year', 'year')
          .addSelect('COUNT(complaint.id)', 'count')
          .innerJoin('complaint.vehicle', 'vehicle')
          .where('vehicle.make = :make', { make })
          .andWhere('vehicle.model = :model', { model })
          .groupBy('vehicle.year')
          .getRawMany();
      }
      
      async getWorstProblems(make: string, model: string) {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .select([
            'complaint.issue AS issue',
            'vehicle.year AS year',
            'MAX(CAST(complaint.cost AS DECIMAL)) AS maxCost'
          ])
          .innerJoin('complaint.vehicle', 'vehicle')
          .where('vehicle.make = :make', { make })
          .andWhere('vehicle.model = :model', { model })
          .groupBy('complaint.issue, vehicle.year')
          .orderBy('maxCost', 'DESC')
          .limit(3)
          .getRawMany();
      }
    
      async update(id: number, updatedComplaint: UpdateComplaintDto): Promise<Complaint>{
        const Complaint = await this.complaintsRepository.findOneBy({ id });
        if (!Complaint) {
          throw new Error('Complaint not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(Complaint, updatedComplaint); 
        return this.complaintsRepository.save(Complaint);
      }

      async delete(id: number): Promise<void> {
        await this.complaintsRepository.delete(id);
      }
}
