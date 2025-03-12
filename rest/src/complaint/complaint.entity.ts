import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.complaints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.complaints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' }) 
  vehicle: Vehicle;
  
  @Column()
  issue: string;

  @Column()
  description: string;

  @Column()
  cost: string;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;
}
