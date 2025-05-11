import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('fixes')
export class Fix {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  issue: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  videourl: string;
}
