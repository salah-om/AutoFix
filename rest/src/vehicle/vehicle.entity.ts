import { ApiProperty } from '@nestjs/swagger';
import { Complaint } from 'src/complaint/complaint.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @ApiProperty({description: 'Primary key as Vehicle Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: 'Make of the car', example: 'Toyota' })
  @Column()
  make: string;

  @ApiProperty({description: 'Model of the car', example: 'Yaris' })
  @Column()
  model: string;

  @ApiProperty({description: 'Year of the model', example: '2005' })
  @Column()
  year: string;

  @ApiProperty({description: 'Image path', example: 'yaris.png' })
  @Column({ default: '' })
  imgurl: string;

  @OneToMany(() => Complaint, (complaint) => complaint.vehicle, { cascade: true })
  complaints: Complaint[];
}