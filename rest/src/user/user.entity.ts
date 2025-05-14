import { ApiProperty } from '@nestjs/swagger';
import { Complaint } from 'src/complaint/complaint.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({description: 'Primary key as User Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: 'Username', example: 'johndoe412' })
  @Column()
  username: string;

  @ApiProperty({description: 'Email', example: 'johndoe412@gmail.com' })
  @Column()
  email: string;

  @ApiProperty({description: 'Password', example: '$2b$10$l.yvk0KxrybKEYMSl7w9POIsEJ0wr3XCWqF19KAuzuo4YLiw80ray' })
  @Column()
  password: string;

  @ApiProperty({description: 'Role of the user', example: 'Visitor' })
  @Column({ default: 'Visitor' })
  role: string;

  @OneToMany(() => Complaint, (complaint) => complaint.user, { cascade: true })
  complaints: Complaint[];
}
