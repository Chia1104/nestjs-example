import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CheckPasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const schema = z.string().min(6).max(20);
    const result = schema.safeParse(value).success;
    if (!result) {
      throw new NotAcceptableException(
        'Invalid password, must be between 6 and 20 characters',
      );
    }
    return value;
  }
}
