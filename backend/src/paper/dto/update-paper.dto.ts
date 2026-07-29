import { IsOptional, IsString } from 'class-validator';

export class UpdatePaperDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  pdfPath?: string;

  @IsOptional()
  @IsString()
  note?: string;
}