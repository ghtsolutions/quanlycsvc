import { PartialType } from '@nestjs/mapped-types';
import { CreateTestlogDto } from './create-testlog.dto';

export class UpdateTestlogDto extends PartialType(CreateTestlogDto) {}
