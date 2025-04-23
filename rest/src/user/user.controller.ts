import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new user entry
        Route: POST /users
        Param:
          - createUserDto (CreateUserDto) -> DTO containing user details
        Postcondition: Returns the newly created user entry
      ----------------------------------------------------------------------------------
    */
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all users
        Route: GET /users
        Postcondition: Returns an array of user records
      ----------------------------------------------------------------------------------
    */
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific user entry by ID
        Route: GET /users/:id
        Param: id (number) -> User ID
        Postcondition: Returns user details if found, otherwise throws NotFoundException
      ----------------------------------------------------------------------------------
    */
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findOne(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing user record
        Route: PATCH /users/:id
        Param:
          - id (number) -> User ID
          - userUpdate (UpdateUserDto) -> DTO containing updated user details
        Postcondition: Returns updated user entry if successful
      ----------------------------------------------------------------------------------
    */
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto) {
        return this.userService.update(id, userUpdate);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a user entry
        Route: DELETE /users/:id
        Param: id (number) -> User ID
        Postcondition: Removes the user record from the database
      ----------------------------------------------------------------------------------
    */
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.delete(id);
    }
}
