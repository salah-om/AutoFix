import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

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
    @ApiCreatedResponse({
      description: 'Created user object as response',
      type: User
    })
    @ApiBadRequestResponse({
      description: 'User could not be registered! Try again'
    })
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
    @ApiOkResponse({
      description: 'Fetched user objects as response',
      type: User
    })
    @ApiBadRequestResponse({
      description: 'Users could not be fetched! Try again'
    })
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
    @ApiOkResponse({
      description: 'Fetched user object by id',
      type: User
    })
    @ApiBadRequestResponse({
      description: 'User not found! Try again'
    })
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
    @ApiOkResponse({
      description: 'Updated user object by id',
      type: User
    })
    @ApiBadRequestResponse({
      description: 'User could not be updated. Try again'
    })
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
    @ApiResponse({
      status: 200,
      description: 'Successfully deleted',
      schema: {
       example: { message: 'Deleted successfully' }
    }
    })
    @ApiBadRequestResponse({
      description: 'User could not be deleted.'
    })
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.delete(id);
    }
}
