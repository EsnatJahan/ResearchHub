import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { DatasetService } from './dataset.service';
import { CreateDatasetDto } from './dto/create-dataset.dto';

@Controller('datasets')
export class DatasetController {
  constructor(
    private readonly datasetService: DatasetService,
  ) {}

@Post()
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/datasets',
      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9) +
          extname(file.originalname);

        cb(null, uniqueName);
      },
    }),
  }),
)
create(
  @UploadedFile() file: Express.Multer.File,
  @Body() createDatasetDto: CreateDatasetDto,
) {
  return this.datasetService.create(
    createDatasetDto,
    file.filename,
    file.originalname,
  );
}
  @Get()
  findAll() {
    return this.datasetService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.datasetService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      name?: string;
      description?: string;
    },
  ) {
    return this.datasetService.update(
      id,
      data,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.datasetService.remove(id);
  }
}