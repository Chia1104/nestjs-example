import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CheckEmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const schema = z.string().email();
    const result = schema.safeParse(value).success;
    if (!result) {
      throw new BadRequestException('Invalid email');
    }
    return value;
  }
}
