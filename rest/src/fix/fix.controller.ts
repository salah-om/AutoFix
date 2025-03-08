import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { FixService } from './fix.service';
import { Fix } from './fix.entity';
import { CreateFixDto } from './dto/create-fix.dto';
import { UpdateFixDto } from './dto/update-fix.dto';

@Controller('fixes')
export class FixController {
    constructor(private readonly fixService: FixService) {
    }

    @Post()
    create(@Body() createfixDto: CreateFixDto) {
        return this.fixService.create(createfixDto);
    }

    @Get()
    findAll(): Promise<Fix[]> {
        return this.fixService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fix> {
        const fix = await this.fixService.findOne(id);
        if(!fix){
            throw new NotFoundException('Fix not found');
        }
        return fix;
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() fixUpdate: UpdateFixDto) {
        return this.fixService.update(id, fixUpdate);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.fixService.delete(id);
    }
}
