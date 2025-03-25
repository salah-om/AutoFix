import { Complaint } from 'src/complaint/complaint.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column({ default: '' })
  imgurl: string;

  @OneToMany(() => Complaint, (complaint) => complaint.vehicle, { cascade: true })
  complaints: Complaint[];
}
