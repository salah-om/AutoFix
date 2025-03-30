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

  async getAdminDashboardStats() {
    const totalUsers = await this.userRepo.count();
    const totalMechanics = await this.userRepo.count({ where: { role: 'Mechanic' } });
    const totalAdmins = await this.userRepo.count({ where: { role: 'Admin' } });
    const totalVehicles = await this.vehicleRepo.count();
    const totalComplaints = await this.complaintRepo.count();

    return { totalUsers, totalMechanics, totalAdmins, totalVehicles, totalComplaints };
  }

  async getMechanicDashboardStats() {
    const totalComplaints = await this.complaintRepo.count();
    const totalFixes = await this.fixRepo.count();

    return { totalComplaints, totalFixes };
  }
}
