import { Injectable, NotFoundException } from '@nestjs/common';
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

      async getBestCars() {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .select('vehicle.make', 'make')
          .addSelect('vehicle.model', 'model')
          .addSelect('vehicle.year', 'year')
          .addSelect('COUNT(complaint.id)', 'complaint_count')
          .addSelect('AVG(complaint.cost)', 'avg_repair_cost')
          .addSelect('(COUNT(complaint.id) * AVG(complaint.cost))', 'severity_score')
          .innerJoin('complaint.vehicle', 'vehicle')
          .groupBy('vehicle.make')
          .addGroupBy('vehicle.model')
          .addGroupBy('vehicle.year')
          .having('COUNT(complaint.id) > 0')
          .orderBy('complaint_count', 'ASC')
          .addOrderBy('avg_repair_cost', 'ASC')
          .limit(3)
          .getRawMany();
      }

      async getWorstCars() {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .select('vehicle.make', 'make')
          .addSelect('vehicle.model', 'model')
          .addSelect('vehicle.year', 'year')
          .addSelect('COUNT(complaint.id)', 'complaint_count')
          .addSelect('AVG(complaint.cost)', 'avg_repair_cost')
          .addSelect('(COUNT(complaint.id) * AVG(complaint.cost))', 'severity_score')
          .innerJoin('complaint.vehicle', 'vehicle')
          .groupBy('vehicle.make')
          .addGroupBy('vehicle.model')
          .addGroupBy('vehicle.year')
          .orderBy('severity_score', 'DESC')
          .addOrderBy('complaint_count', 'DESC') 
          .limit(3)
          .getRawMany();
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

      async getComplaintsByMakeModel(make: string, model: string) {
        return this.complaintsRepository.find({
          where: {
            vehicle: {
              make,
              model
            }
          },
          relations: ['user', 'vehicle'],
          order: {
            date: 'DESC'
          }
        });
      }

      async getComplaintsByUser(userId: number) {
        return this.complaintsRepository.find({
          where: { user: { id: userId } },
          relations: ['vehicle', 'user'],
          order: { date: 'DESC' }
        });
      }

      async findOneForUser(id: number, userId: number) {
        return this.complaintsRepository.findOne({
          where: {
            id,
            user: { id: userId }
          },
          relations: ['user']
        });
      }

      async searchComplaints(query: string, limit: number) {
        return this.complaintsRepository
          .createQueryBuilder('complaint')
          .leftJoinAndSelect('complaint.vehicle', 'vehicle')
          .where('complaint.issue LIKE :query', { query: `%${query}%` })
          .orWhere('complaint.description LIKE :query', { query: `%${query}%` })
          .orWhere('vehicle.make LIKE :query', { query: `%${query}%` })
          .orWhere('vehicle.model LIKE :query', { query: `%${query}%` })
          .orderBy('complaint.date', 'DESC')
          .take(limit)
          .getMany();
      }
    
      async update(id: number, updateComplaintDto: UpdateComplaintDto): Promise<Complaint>{
        const complaint = await this.complaintsRepository.findOneBy({ id });
        if (!complaint) {
          throw new NotFoundException('Complaint not found');
        }

        // Only update the fields that were actually provided
        if (updateComplaintDto.issue !== undefined) {
          complaint.issue = updateComplaintDto.issue;
        }
        if (updateComplaintDto.description !== undefined) {
          complaint.description = updateComplaintDto.description;
        }
        if (updateComplaintDto.cost !== undefined) {
        complaint.cost = updateComplaintDto.cost; // Stays as string
        }

        return this.complaintsRepository.save(complaint);
      }

      async delete(id: number): Promise<void> {
        await this.complaintsRepository.delete(id);
      }
}
