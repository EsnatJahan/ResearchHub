import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaperService } from './paper.service';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';

@Controller('papers')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  create(@Body() createPaperDto: CreatePaperDto) {
    return this.paperService.create(createPaperDto);
  }

  @Get()
  findAll() {
    return this.paperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paperService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaperDto: UpdatePaperDto,
  ) {
    return this.paperService.update(Number(id), updatePaperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paperService.remove(Number(id));
  }
}