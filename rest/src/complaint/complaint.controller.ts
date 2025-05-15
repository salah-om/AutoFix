import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException, UseGuards, Request, Req, UnauthorizedException, Query, BadRequestException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './complaint.entity';
import { ComplaintService } from './complaint.service';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) {
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new complaint entry
        Route: POST /complaints
        Param:
          - req (Request) -> Request object containing authenticated user ID
          - createComplaintDto (CreateComplaintDto) -> DTO containing complaint details
        Postcondition: Returns the newly created complaint
      ----------------------------------------------------------------------------------
    */
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiCreatedResponse({
              description: 'Created complaint as response',
              type: Complaint
            })
        @ApiBadRequestResponse({
              description: 'Complaint could not be submitted!'
        })
    create(@Request() req, @Body() createComplaintDto: CreateComplaintDto) {
        const userId = req.user?.id;
        console.log("User in controller:", req.user);
        return this.complaintService.create(userId, createComplaintDto);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all complaints with user and vehicle details
        Route: GET /complaints
        Postcondition: Returns an array of complaints
      ----------------------------------------------------------------------------------
    */
    @Get()
    @ApiOkResponse({
              description: 'Fetched complaints as response',
              type: [UpdateComplaintDto]
            })
        @ApiBadRequestResponse({
              description: 'Complaints could not be fetched! Try again'
            })
    findAll(): Promise<Complaint[]> {
        return this.complaintService.findAll();
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves complaints for the authenticated user
        Route: GET /complaints/user
        Param: req (Request) -> Request object containing authenticated user ID
        Postcondition: Returns an array of complaints linked to the user
      ----------------------------------------------------------------------------------
    */
    @Get('user')
    @ApiOkResponse({
              description: 'Fetched complaints submitted by a specific user',
              type: [UpdateComplaintDto]
            })
        @ApiBadRequestResponse({
              description: 'Complaints could not be found! Try again'
            })
    @UseGuards(JwtAuthGuard)
    async getUserComplaints(@Req() req) {
        const userId = req.user.id; // Assuming you're using JWT with user ID
        return this.complaintService.getComplaintsByUser(userId);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Searches complaints based on a query string
        Route: GET /complaints/search
        Param:
          - query (string) -> Search keyword for complaints
          - limit (number) -> Maximum number of results to return
        Postcondition: Returns matching complaints based on the query
      ----------------------------------------------------------------------------------
    */
    @Get('search')
     @ApiOkResponse({
        description: 'Returned search results',
        type: [Complaint]
    })
    @ApiBadRequestResponse({
        description: 'Invalid search query'
    })
    async searchComplaints(
    @Query('query') query: string,
    @Query('limit') limit: number = 20
    ) {
        if (!query || query.length < 3) {
            throw new BadRequestException('Search query must be at least 3 characters');
        }
        return this.complaintService.searchComplaints(query, limit);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the best-ranked cars based on complaint analysis
        Route: GET /complaints/top-best
        Postcondition: Returns an array of top-ranked cars with low complaint severity
      ----------------------------------------------------------------------------------
    */
    @Get('top-best')
     @ApiOkResponse({
        description: 'Fetched top best vehicles based on complaint analysis'
    })
    async getBestCars() {
        return this.complaintService.getBestCars(); 
    } 

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst-ranked cars based on complaint analysis
        Route: GET /complaints/top-worst
        Postcondition: Returns an array of worst-ranked cars with high complaint severity
      ----------------------------------------------------------------------------------
    */
    @Get('top-worst')
    @ApiOkResponse({
        description: 'Fetched top worst vehicles based on complaint analysis'
    })
    async getWorstCars() {
        return this.complaintService.getWorstCars(); 
    } 

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst model year based on complaints for a specific make and model
        Route: GET /complaints/:make/:model/worst-year
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Postcondition: Returns the worst year with complaint count
      ----------------------------------------------------------------------------------
    */
    @Get(':make/:model/worst-year')
    @ApiOkResponse({
        description: 'Fetched worst year for a make and model'
    })
    async getWorstYear( @Param('make') make: string, @Param('model') model: string ) { 
        return this.complaintService.getWorstYear(make, model); 
    } 
    
    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves complaints grouped by year for a given make and model
        Route: GET /complaints/:make/:model/complaints-by-year
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Postcondition: Returns an array of complaints grouped by year
      ----------------------------------------------------------------------------------
    */
    @Get(':make/:model/complaints-by-year')
    @ApiOkResponse({
        description: 'Fetched complaints grouped by year for the given make and model'
    })
    async getComplaintsByYear( @Param('make') make: string, @Param('model') model: string ) {
        return this.complaintService.getComplaintsByYear(make, model); 
    } 
    
    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves the worst problems reported for a specific make and model
        Route: GET /complaints/:make/:model/worst-problems
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Postcondition: Returns an array of worst problems sorted by cost
      ----------------------------------------------------------------------------------
    */
    @Get(':make/:model/worst-problems')
    @ApiOkResponse({
        description: 'Fetched worst problems sorted by cost for a make and model'
    })
    async getWorstProblems( @Param('make') make: string, @Param('model') model: string ) {
        return this.complaintService.getWorstProblems(make, model); 
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all complaints for a specific make and model
        Route: GET /complaints/:make/:model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Postcondition: Returns an array of complaints related to the given make and model
      ----------------------------------------------------------------------------------
    */
    @Get(':make/:model')
    @ApiOkResponse({
        description: 'Fetched complaints for a specific make and model'
    })
    async getComplaintsByMakeModel( @Param('make') make: string, @Param('model') model: string) {
        return this.complaintService.getComplaintsByMakeModel(make, model);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific complaint entry by ID
        Route: GET /complaints/:id
        Param: id (number) -> Complaint ID
        Postcondition: Returns complaint details if found, otherwise throws NotFoundException
      ----------------------------------------------------------------------------------
    */    
    @Get(':id')
    @ApiOkResponse({
        description: 'Fetched specific complaint by ID',
        type: Complaint
    })
    @ApiNotFoundResponse({
        description: 'Complaint not found'
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Complaint> {
        const Complaint = await this.complaintService.findOne(id);
        if(!Complaint){
            throw new NotFoundException('Complaint not found');
        }
        return Complaint;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates complaint details
        Route: PATCH /complaints/:id
        Param:
          - id (number) -> Complaint ID
          - updateComplaintDto (UpdateComplaintDto) -> DTO containing updated complaint details
        Postcondition: Returns updated complaint details if successful
      ----------------------------------------------------------------------------------
    */
    @Patch(':id')
    @ApiOkResponse({
        description: 'Updated complaint successfully',
        type: Complaint
    })
    @ApiUnauthorizedResponse({
        description: 'User not authorized to update this complaint'
    })
    @ApiBadRequestResponse({
        description: 'Invalid update request'
    })
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateComplaintDto: UpdateComplaintDto,
        @Req() req
        ) {
        
        const userId = req.user?.id;
        const complaint = await this.complaintService.findOneForUser(id,userId);
  
        if (!complaint) {
            throw new UnauthorizedException('Complaint not found.');
        }

        return this.complaintService.update(id, updateComplaintDto);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a complaint entry
        Route: DELETE /complaints/:id
        Param: id (number) -> Complaint ID
        Postcondition: Removes the complaint from the database
      ----------------------------------------------------------------------------------
    */
    @Delete(':id')
    @ApiOkResponse({
        description: 'Complaint deleted successfully'
    })
    @ApiBadRequestResponse({
        description: 'Complaint could not be deleted'
    })
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.complaintService.delete(id);
    }
}
