import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLichsuDto } from './dto/create-lichsu.dto';
import { UpdateLichsuDto } from './dto/update-lichsu.dto';
import { LichsuEntity } from "./entities/lichsu.entity";
@Injectable()
export class LichsuService {
  constructor(
    @InjectRepository(LichsuEntity)
    private LichsuRepository: Repository<LichsuEntity>,
  ) {}
  async create(createLichsuDto: CreateLichsuDto) {
    this.LichsuRepository.create(createLichsuDto);
    const result = await this.LichsuRepository.save(createLichsuDto);
    return result
  }
  async findAll() {
    return await this.LichsuRepository.find();
  }
  async findOne(id: string) {
    return await this.LichsuRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.LichsuRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateLichsuDto>) {
    await this.LichsuRepository.update({ id }, data);
    return await this.LichsuRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.LichsuRepository.delete({ id });
    return { deleted: true };
  }
} 