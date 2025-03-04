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
    
      create(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.save(createUserDto);
      }
    
      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id: id });
      }
    
      async update(id: number, updatedUser: UpdateUserDto): Promise<User>{
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new Error('User not found');
        }
        // instead of manually assigning each attribute with an if statement
        Object.assign(user, updatedUser); 
        return this.usersRepository.save(user);
      }

      async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
