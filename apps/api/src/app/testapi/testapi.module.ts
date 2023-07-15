import { Module } from '@nestjs/common';
import { TestapiService } from './testapi.service';
import { TestapiController } from './testapi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestapiEntity } from './entities/testapi.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TestapiEntity])],
  controllers: [TestapiController],
  providers: [TestapiService],
})
export class TestapiModule {}