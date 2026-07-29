import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaperDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  note?: string;
}