import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException, UseGuards, Request } from '@nestjs/common';
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

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Complaint> {
        const Complaint = await this.complaintService.findOne(id);
        if(!Complaint){
            throw new NotFoundException('Complaint not found');
        }
        return Complaint;
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() ComplaintUpdate: UpdateComplaintDto) {
        return this.complaintService.update(id, ComplaintUpdate);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.complaintService.delete(id);
    }
}
