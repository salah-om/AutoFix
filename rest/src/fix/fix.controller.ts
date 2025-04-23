import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { FixService } from './fix.service';
import { Fix } from './fix.entity';
import { CreateFixDto } from './dto/create-fix.dto';
import { UpdateFixDto } from './dto/update-fix.dto';

@Controller('fixes')
export class FixController {
    constructor(private readonly fixService: FixService) {
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new fix entry
        Route: POST /fixes
        Param:
          - createFixDto (CreateFixDto) -> DTO containing fix details
        Postcondition: Returns the newly created fix entry
      ----------------------------------------------------------------------------------
    */
    @Post()
    create(@Body() createfixDto: CreateFixDto) {
        return this.fixService.create(createfixDto);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all fix records
        Route: GET /fixes
        Postcondition: Returns an array of fix records
      ----------------------------------------------------------------------------------
    */
    @Get()
    findAll(): Promise<Fix[]> {
        return this.fixService.findAll();
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific fix entry by ID
        Route: GET /fixes/:id
        Param: id (number) -> Fix ID
        Postcondition: Returns fix details if found, otherwise throws NotFoundException
      ----------------------------------------------------------------------------------
    */
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fix> {
        const fix = await this.fixService.findOne(id);
        if(!fix){
            throw new NotFoundException('Fix not found');
        }
        return fix;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing fix record
        Route: PATCH /fixes/:id
        Param:
          - id (number) -> Fix ID
          - fixUpdate (UpdateFixDto) -> DTO containing updated fix details
        Postcondition: Returns updated fix entry if successful
      ----------------------------------------------------------------------------------
    */
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() fixUpdate: UpdateFixDto) {
        return this.fixService.update(id, fixUpdate);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a fix entry
        Route: DELETE /fixes/:id
        Param: id (number) -> Fix ID
        Postcondition: Removes the fix record from the database
      ----------------------------------------------------------------------------------
    */
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.fixService.delete(id);
    }
}
