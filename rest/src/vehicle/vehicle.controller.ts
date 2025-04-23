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

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new vehicle entry with optional image upload
        Route: POST /vehicles
        Param:
          - file (Express.Multer.File) -> Uploaded image file
          - createVehicleDto (CreateVehicleDto) -> DTO containing vehicle details
        Postcondition: Returns the newly created vehicle entry with image URL if provided
      ----------------------------------------------------------------------------------
    */
    @Post()
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
    create(@UploadedFile() file: Express.Multer.File, @Body() createVehicleDto: CreateVehicleDto) {
        if (file) {
            createVehicleDto.imgurl = `/${file.originalname}`;
        }
        return this.vehicleService.create(createVehicleDto);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all vehicles, optionally filtered by make, model, or year
        Route: GET /vehicles
        Param:
          - make (string | optional) -> Vehicle make filter
          - model (string | optional) -> Vehicle model filter
          - year (string | optional) -> Vehicle year filter
        Postcondition: Returns an array of vehicles matching the given criteria
      ----------------------------------------------------------------------------------
    */
    @Get()
    async findAll(
        @Query('make') make?: string,
        @Query('model') model?: string,
        @Query('year') year?: string
    ):  Promise<Vehicle[]> {
        return this.vehicleService.findByMakeModelYear(make, model, year);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct vehicle makes
        Route: GET /vehicles/makes
        Postcondition: Returns an array of unique vehicle makes
      ----------------------------------------------------------------------------------
    */
    @Get('makes')
    async getDistinctMakes() {
        return this.vehicleService.getDistinctMakes();
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct models for a given vehicle make
        Route: GET /vehicles/models/:make
        Param: make (string) -> Vehicle make
        Postcondition: Returns an array of unique models for the specified make
      ----------------------------------------------------------------------------------
    */
    @Get('models/:make')
    async getModelsByMake(@Param('make') make: string) {
        return this.vehicleService.getModelsByMake(make);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves distinct years for a given make and model
        Route: GET /vehicles/years/:make/:model
        Param:
          - make (string) -> Vehicle make
          - model (string) -> Vehicle model
        Postcondition: Returns an array of unique years for the specified vehicle
      ----------------------------------------------------------------------------------
    */
    @Get('years/:make/:model')
    async getYearsByMakeAndModel(
        @Param('make') make: string, 
        @Param('model') model: string
    ) {
        return this.vehicleService.getYearsByMakeAndModel(make,model);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific vehicle entry by ID
        Route: GET /vehicles/:id
        Param: id (number) -> Vehicle ID
        Postcondition: Returns vehicle details if found, otherwise throws NotFoundException
      ----------------------------------------------------------------------------------
    */
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
        const Vehicle = await this.vehicleService.findOne(id);
        if(!Vehicle){
            throw new NotFoundException('Vehicle not found');
        }
        return Vehicle;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing vehicle record with optional image upload
        Route: PATCH /vehicles/:id
        Param:
          - id (number) -> Vehicle ID
          - file (Express.Multer.File | optional) -> Uploaded image file
          - updateVehicleDto (UpdateVehicleDto) -> DTO containing updated vehicle details
        Postcondition: Returns updated vehicle entry with image URL if provided
      ----------------------------------------------------------------------------------
    */
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

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a vehicle entry
        Route: DELETE /vehicles/:id
        Param: id (number) -> Vehicle ID
        Postcondition: Removes the vehicle record from the database
      ----------------------------------------------------------------------------------
    */
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.vehicleService.delete(id);
    }
}
