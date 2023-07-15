import { Module } from '@nestjs/common';
import { ThietbiService } from './thietbi.service';
import { ThietbiController } from './thietbi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thietbi } from './entities/thietbi.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Thietbi])],
  controllers: [ThietbiController],
  providers: [ThietbiService],
})
export class ThietbiModule {}