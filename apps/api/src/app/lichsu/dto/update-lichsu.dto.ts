import { PartialType } from '@nestjs/mapped-types';
import { CreateLichsuDto } from './create-lichsu.dto';


export class UpdateLichsuDto extends PartialType(CreateLichsuDto) {}
