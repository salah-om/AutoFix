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
    
    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new complaint entry
        Param:
          - userId (number) -> ID of the user submitting the complaint
          - createComplaintDto (CreateComplaintDto) -> DTO containing complaint details
        Return: Newly created complaint entry
      ----------------------------------------------------------------------------------
    */
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
      
     /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all complaints with user and vehicle details
        Return: Array of complaints with relations included
      ----------------------------------------------------------------------------------
    */
      async findAll(): Promise<Complaint[]> {
        return this.complaintsRepository.find({
          relations: ['user', 'vehicle'], 
      });
      }
    
    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a complaint by its ID
        Param: id (number) -> Complaint ID
        Return: Complaint entry if found, otherwise null
      ----------------------------------------------------------------------------------
    */
      async findOne(id: number): Promise<Complaint | null> {
        return this.complaintsRepository.findOneBy({ id: id });
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the best-rated cars based on complaint severity and repair costs
        Return: Array of top-ranked cars with low complaint severity
      ----------------------------------------------------------------------------------
      */
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

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst-rated cars based on complaint severity and repair costs
        Return: Array of worst-ranked cars with high complaint severity
      ----------------------------------------------------------------------------------
      */
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

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst model year based on complaints for a specific make and model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Return: Object containing worst year and complaint count
      ----------------------------------------------------------------------------------
      */
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
      
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves complaints grouped by year for a given make and model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Return: Array of complaints grouped by year
      ----------------------------------------------------------------------------------
      */
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
      
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst problems reported for a specific make and model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Return: Array of worst problems sorted by cost
      ----------------------------------------------------------------------------------
      */
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

      /*  
        ----------------------------------------------------------------------------------
          Purpose: Retrieves all complaints for a specific vehicle make and model
          Param:
            - make (string) -> Vehicle make
            - model (string) -> Vehicle model
          Return: Array of complaints related to the given make and model, ordered by most recent
        ----------------------------------------------------------------------------------
      */
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

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all complaints submitted by a specific user
        Param: userId (number) -> ID of the user whose complaints are being retrieved
        Return: Array of complaints associated with the user, ordered by most recent
      ----------------------------------------------------------------------------------
      */
      async getComplaintsByUser(userId: number) {
        return this.complaintsRepository.find({
          where: { user: { id: userId } },
          relations: ['vehicle', 'user'],
          order: { date: 'DESC' }
        });
      }

      /*  
        ----------------------------------------------------------------------------------
          Purpose: Retrieves a specific complaint for a user
          Param: 
            - id (number) -> Complaint ID
            - userId (number) -> ID of the user submitting the complaint
          Return: Complaint entry if found, otherwise null
        ----------------------------------------------------------------------------------
      */
      async findOneForUser(id: number, userId: number) {
        return this.complaintsRepository.findOne({
          where: {
            id,
            user: { id: userId }
          },
          relations: ['user']
        });
      }

      /*  
        ----------------------------------------------------------------------------------
          Purpose: Searches complaints based on a query string
          Param:
            - query (string) -> Search keyword for complaints
            - limit (number) -> Maximum number of results to return
          Return: Array of complaints matching the search criteria, ordered by most recent
        ----------------------------------------------------------------------------------
      */
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
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates complaint details
        Param:
          - id (number) -> Complaint ID
          - updateComplaintDto (UpdateComplaintDto) -> DTO containing updated complaint details
        Return: Updated complaint entry
      ----------------------------------------------------------------------------------
      */
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
        complaint.cost = updateComplaintDto.cost; 
        }

        return this.complaintsRepository.save(complaint);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a complaint entry
        Param: id (number) -> Complaint ID
        Postcondition: Complaint entry is removed from the database
      ----------------------------------------------------------------------------------
      */
      async delete(id: number): Promise<void> {
        await this.complaintsRepository.delete(id);
      }
}
