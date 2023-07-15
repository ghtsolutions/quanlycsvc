import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTestapiDto } from './dto/create-testapi.dto';
import { UpdateTestapiDto } from './dto/update-testapi.dto';
import { TestapiEntity } from "./entities/testapi.entity";
@Injectable()
export class TestapiService {
  constructor(
    @InjectRepository(TestapiEntity)
    private TestapiRepository: Repository<TestapiEntity>
  ) {}
  async create(createTestapiDto: CreateTestapiDto) {
    this.TestapiRepository.create(createTestapiDto);
    const result = await this.TestapiRepository.save(createTestapiDto);
    return result
  }
  async findAll() {
    return await this.TestapiRepository.find();
  }
  async findOne(id: string) {
    return await this.TestapiRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.TestapiRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateTestapiDto>) {
    await this.TestapiRepository.update({ id }, data);
    return await this.TestapiRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.TestapiRepository.delete({ id });
    return { deleted: true };
  }
} 