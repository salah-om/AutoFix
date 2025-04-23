import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from 'src/complaint/complaint.entity';
import { Fix } from 'src/fix/fix.entity';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Complaint) private complaintRepo: Repository<Complaint>,
    @InjectRepository(Fix) private fixRepo: Repository<Fix>,
  ) {}

  /*  
    ----------------------------------------------------------------------------------
      Purpose: Retrieves statistical data for the admin dashboard, including user roles 
               and complaint counts
      Return: Object containing:
              - totalUsers (number) -> Total number of registered users
              - totalMechanics (number) -> Total number of mechanics
              - totalAdmins (number) -> Total number of administrators
              - totalVehicles (number) -> Total number of registered vehicles
              - totalComplaints (number) -> Total number of submitted complaints
    ----------------------------------------------------------------------------------
  */
  async getAdminDashboardStats() {
    const totalUsers = await this.userRepo.count();
    const totalMechanics = await this.userRepo.count({ where: { role: 'Mechanic' } });
    const totalAdmins = await this.userRepo.count({ where: { role: 'Admin' } });
    const totalVehicles = await this.vehicleRepo.count();
    const totalComplaints = await this.complaintRepo.count();

    return { totalUsers, totalMechanics, totalAdmins, totalVehicles, totalComplaints };
  }

  /*  
    ----------------------------------------------------------------------------------
      Purpose: Retrieves statistical data for the mechanic dashboard, including complaints
               and fixes
      Return: Object containing:
              - totalComplaints (number) -> Total number of complaints logged
              - totalFixes (number) -> Total number of fixes recorded
    ----------------------------------------------------------------------------------
  */
  async getMechanicDashboardStats() {
    const totalComplaints = await this.complaintRepo.count();
    const totalFixes = await this.fixRepo.count();

    return { totalComplaints, totalFixes };
  }
}
