import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';
import { PaperController } from './paper.controller';

@Module({
  providers: [PaperService],
  controllers: [PaperController],
  exports: [PaperService],
})
export class PaperModule {}