import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException, UseGuards, Request, Req, UnauthorizedException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './complaint.entity';
import { ComplaintService } from './complaint.service';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createComplaintDto: CreateComplaintDto) {
        const userId = req.user?.id;
        console.log("User in controller:", req.user);
        return this.complaintService.create(userId, createComplaintDto);
    }

    @Get()
    findAll(): Promise<Complaint[]> {
        return this.complaintService.findAll();
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    async getUserComplaints(@Req() req) {
        const userId = req.user.id; // Assuming you're using JWT with user ID
        return this.complaintService.getComplaintsByUser(userId);
    }

    @Get(':make/:model/worst-year') 
    async getWorstYear( @Param('make') make: string, @Param('model') model: string ) { 
        return this.complaintService.getWorstYear(make, model); 
    } 
            
    @Get(':make/:model/complaints-by-year') 
    async getComplaintsByYear( @Param('make') make: string, @Param('model') model: string ) {
        return this.complaintService.getComplaintsByYear(make, model); 
    } 
            
    @Get(':make/:model/worst-problems') 
    async getWorstProblems( @Param('make') make: string, @Param('model') model: string ) {
        return this.complaintService.getWorstProblems(make, model); 
    }

    @Get(':make/:model')
    async getComplaintsByMakeModel( @Param('make') make: string, @Param('model') model: string) {
        return this.complaintService.getComplaintsByMakeModel(make, model);
    }
        
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Complaint> {
        const Complaint = await this.complaintService.findOne(id);
        if(!Complaint){
            throw new NotFoundException('Complaint not found');
        }
        return Complaint;
    }

    @Patch(':id')
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

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.complaintService.delete(id);
    }
}
