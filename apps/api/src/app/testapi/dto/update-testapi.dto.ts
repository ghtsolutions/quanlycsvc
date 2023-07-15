import { PartialType } from '@nestjs/mapped-types';
import { CreateTestapiDto } from './create-testapi.dto';

export class UpdateTestapiDto extends PartialType(CreateTestapiDto) {}
