import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CheckEmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const schema = z.string().email();
    const result = schema.safeParse(value).success;
    if (!result) {
      throw new NotAcceptableException('Invalid email');
    }
    return value;
  }
}
