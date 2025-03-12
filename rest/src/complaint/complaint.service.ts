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
    
      async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        const { user_id, vehicle_id, issue, description, cost } = createComplaintDto;
      
        const user = await this.userService.findOne(user_id);
        const vehicle = await this.vehicleService.findOne(vehicle_id);
      
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
        return this.complaintsRepository.find();
      }
    
      async findOne(id: number): Promise<Complaint | null> {
        return this.complaintsRepository.findOneBy({ id: id });
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
