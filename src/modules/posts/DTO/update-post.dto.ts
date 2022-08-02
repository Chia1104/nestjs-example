import { Length, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @Length(1, 50)
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string | null | undefined;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  content?: string | null | undefined;
}
