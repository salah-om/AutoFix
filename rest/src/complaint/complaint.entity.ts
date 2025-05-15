import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('complaints')
export class Complaint {
@ApiProperty({ description: 'Primary key as Complaint Id', example: '1' })
@PrimaryGeneratedColumn()
id: number;

@ApiProperty({ description: 'Foreign key as User Id', example: '3', type: () => User })
@ManyToOne(() => User, (user: User) => user.complaints, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'user_id' })
user: User;

@ApiProperty({ description: 'Foreign key as Vehicle Id', example: '5', type: () => Vehicle })
@ManyToOne(() => Vehicle, (vehicle: Vehicle) => vehicle.complaints, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'vehicle_id' })
vehicle: Vehicle;

@ApiProperty({ description: 'Issue of complaint', example: 'Engine Failure' })
@Column()
issue: string;

@ApiProperty({ description: 'Description of complaint', example: 'I haven\'t driven in a while so it wouldn\'t start.' })
@Column()
description: string;

@ApiProperty({ description: 'Cost of problem', example: '$300' })
@Column()
cost: string;

@ApiProperty({ description: 'Date complaint submitted', example: '6-5-2025' })
@CreateDateColumn({ type: 'timestamp' })
date: Date;

}
