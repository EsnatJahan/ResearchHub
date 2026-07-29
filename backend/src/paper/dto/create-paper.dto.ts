import { IsOptional, IsString } from 'class-validator';

export class CreatePaperDto {
  @IsString()
  title!: string;

  @IsString()
  pdfPath!: string;

  @IsOptional()
  @IsString()
  note?: string;
}