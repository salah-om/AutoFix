import { Module } from '@nestjs/common';
import { FixResolver } from './fix.resolver';
import { FixService } from './fix.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fix } from './fix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fix])],
  providers: [FixService, FixResolver]
})
export class FixModule {}
