import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { PaperService } from './paper.service';

import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';

@Controller('papers')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads/papers',

        filename: (req, file, cb) => {
          const unique =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1000000);

          cb(
            null,
            unique + extname(file.originalname),
          );
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePaperDto,
  ) {
    return this.paperService.create(body, file.filename);
  }

  @Get()
  findAll() {
    return this.paperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaperDto,
  ) {
    return this.paperService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paperService.remove(+id);
  }
}