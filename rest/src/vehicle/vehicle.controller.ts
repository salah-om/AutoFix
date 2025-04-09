import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {
    }

    @Post()
    @UseInterceptors(
    FileInterceptor('imgurl', {
      storage: diskStorage({
        destination: './public', // Make sure this folder exists
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
    create(@UploadedFile() file: Express.Multer.File, @Body() createVehicleDto: CreateVehicleDto) {
        if (file) {
            createVehicleDto.imgurl = `/${file.originalname}`;
        }
        return this.vehicleService.create(createVehicleDto);
    }

    @Get()
    async findAll(
        @Query('make') make?: string,
        @Query('model') model?: string,
        @Query('year') year?: string
    ):  Promise<Vehicle[]> {
        return this.vehicleService.findByMakeModelYear(make, model, year);
    }

    @Get('makes')
    async getDistinctMakes() {
        return this.vehicleService.getDistinctMakes();
    }

    @Get('models/:make')
    async getModelsByMake(@Param('make') make: string) {
        return this.vehicleService.getModelsByMake(make);
    }

    @Get('years/:make/:model')
    async getYearsByMakeAndModel(
        @Param('make') make: string, 
        @Param('model') model: string
    ) {
        return this.vehicleService.getYearsByMakeAndModel(make,model);
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
    @UseInterceptors(
        FileInterceptor('imgurl', {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        }),
    )

    async update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        if (file) {
        updateVehicleDto.imgurl = `/${file.originalname}`;
        }
        return this.vehicleService.update(id, updateVehicleDto);
    }


    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.vehicleService.delete(id);
    }
}
