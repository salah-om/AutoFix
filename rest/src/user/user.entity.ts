import { Complaint } from 'src/complaint/complaint.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Visitor' })
  role: string;

  @OneToMany(() => Complaint, (complaint) => complaint.user, { cascade: true })
  complaints: Complaint[];
}
