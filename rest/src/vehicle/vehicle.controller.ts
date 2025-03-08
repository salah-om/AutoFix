import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './vehicle.service';


@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {
    }

    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.create(createVehicleDto);
    }

    @Get()
    findAll(): Promise<Vehicle[]> {
        return this.vehicleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
        const Vehicle = await this.vehicleService.findOne(id);
        if(!Vehicle){
            throw new NotFoundException('Vehicle not found');
        }
        return Vehicle;
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() VehicleUpdate: UpdateVehicleDto) {
        return this.vehicleService.update(id, VehicleUpdate);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.vehicleService.delete(id);
    }
}
