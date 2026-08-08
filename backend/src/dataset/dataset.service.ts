import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateDatasetDto } from './dto/create-dataset.dto';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatasetService {
  constructor(private prisma: PrismaService) {}

  async create(
    createDatasetDto: CreateDatasetDto,
    filename: string,
    originalName: string,
  ) {
    return this.prisma.dataset.create({
      data: {
        name: createDatasetDto.name,
        description:
          createDatasetDto.description,
        filePath: `/uploads/datasets/${filename}`,
        originalName,
      },
    });
  }

  async findAll() {
    return this.prisma.dataset.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.dataset.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    return this.prisma.dataset.update({
      where: {
        id,
      },
      data,
    });
  }
  
  async remove(id: number) {
    const dataset =
      await this.prisma.dataset.findUnique({
        where: {
          id,
        },
      });

    if (!dataset) {
      throw new NotFoundException(
        'Dataset not found',
      );
    }

    const filePath = path.join(
      process.cwd(),
      dataset.filePath.replace(/^\/+/, ''),
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.prisma.dataset.delete({
      where: {
        id,
      },
    });
  }
 
}