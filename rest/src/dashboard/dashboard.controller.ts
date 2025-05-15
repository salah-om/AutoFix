import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse } from '@nestjs/swagger';

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
  @ApiOkResponse({
          description: 'Fetched admin stats'
      })
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
  @ApiOkResponse({
          description: 'Fetched mechanic stats'
      })
  async getMechanicStats() {
    return this.dashboardService.getMechanicDashboardStats();
  }
}
