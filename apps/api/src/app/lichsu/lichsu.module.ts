import { Module } from '@nestjs/common';
import { LichsuController } from './lichsu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LichsuEntity } from './entities/lichsu.entity';
import { LichsuService } from './lichsu.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([LichsuEntity]),
  ],
  controllers: [LichsuController],
  providers: [LichsuService]
})
export class LichsuModule {}