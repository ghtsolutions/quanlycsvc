import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateThietbiDto } from './dto/create-thietbi.dto';
import { UpdateThietbiDto } from './dto/update-thietbi.dto';
import { Thietbi } from "./entities/thietbi.entity";
@Injectable()
export class ThietbiService {
  constructor(
    @InjectRepository(Thietbi)
    private ThietbiRepository: Repository<Thietbi>
  ) {}
  async create(createThietbiDto: CreateThietbiDto) {
    this.ThietbiRepository.create(createThietbiDto);
    const result = await this.ThietbiRepository.save(createThietbiDto);
    return result
  }
  async findAll() {
    return await this.ThietbiRepository.find();
  }
  async findOne(id: string) {
    return await this.ThietbiRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.ThietbiRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateThietbiDto>) {
    await this.ThietbiRepository.update({ id }, data);
    return await this.ThietbiRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.ThietbiRepository.delete({ id });
    return { deleted: true };
  }
} 