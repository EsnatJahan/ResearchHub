import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';

@Injectable()
export class PaperService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPaperDto: CreatePaperDto,
    filename: string,
  ) {
    return this.prisma.paper.create({
      data: {
        title: createPaperDto.title,
        note: createPaperDto.note,
        pdfPath: `/uploads/papers/${filename}`,
      },
    });
  }

  async findAll() {
    return this.prisma.paper.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.paper.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updatePaperDto: UpdatePaperDto,
  ) {
    return this.prisma.paper.update({
      where: {
        id,
      },
      data: updatePaperDto,
    });
  }

  async remove(id: number) {
    return this.prisma.paper.delete({
      where: {
        id,
      },
    });
  }
}