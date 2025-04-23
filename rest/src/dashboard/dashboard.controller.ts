import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves dashboard statistics for admin users
        Route: GET /dashboard/adminstats
        Postcondition: Returns total counts for users, vehicles, complaints
      ----------------------------------------------------------------------------------
  */
  @Get('adminstats')
  async getStats() {
    return this.dashboardService.getAdminDashboardStats();
  }

  /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves dashboard statistics for mechanic users
        Route: GET /dashboard/mechanicstats
        Postcondition: Returns total counts for complaints and fixes
      ----------------------------------------------------------------------------------
  */
  @Get('mechanicstats')
  async getMechanicStats() {
    return this.dashboardService.getMechanicDashboardStats();
  }
}
