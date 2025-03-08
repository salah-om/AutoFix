import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fixes')
export class Fix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issue: string;

  @Column()
  description: string;

  @Column()
  videourl: string;
}
