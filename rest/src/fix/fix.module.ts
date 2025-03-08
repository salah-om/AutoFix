import { Module } from '@nestjs/common';
import { FixController } from './fix.controller';
import { FixService } from './fix.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fix } from './fix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fix])],
  controllers: [FixController],
  providers: [FixService]
})
export class FixModule {}
