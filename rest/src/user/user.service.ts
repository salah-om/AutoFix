import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new user entry
        Param:
          - createUserDto (CreateUserDto) -> DTO containing user details
        Return: Newly created user entry
      ----------------------------------------------------------------------------------
      */
      create(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.save(createUserDto);
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all users
        Return: Array of user records
      ----------------------------------------------------------------------------------
      */
      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific user entry by ID
        Param: id (number) -> User ID
        Return: User entry if found, otherwise null
      ----------------------------------------------------------------------------------
      */
      async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id: id });
      }
    
      /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing user record
        Param:
          - id (number) -> User ID
          - updatedUser (UpdateUserDto) -> DTO containing updated user details
        Return: Updated user entry if successful
      ----------------------------------------------------------------------------------
      */
      async update(id: number, updatedUser: UpdateUserDto): Promise<User>{
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new Error('User not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(user, updatedUser); 
        return this.usersRepository.save(user);
      }

      /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a user entry
        Param: id (number) -> User ID
        Postcondition: User entry is removed from the database
      ----------------------------------------------------------------------------------
      */
      async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
