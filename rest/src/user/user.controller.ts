import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get()
    findAll() {
        return []
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return { id }
    }

    @Post('register')
    create(@Body() user: {}) {

    }

}
