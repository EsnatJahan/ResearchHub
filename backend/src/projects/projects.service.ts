import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreatePaperDto } from '../paper/dto/create-paper.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaperService } from '../paper/paper.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private paperService: PaperService,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  findAll() {
    return this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        papers: {
          include: {
            paper: true,
          },
        },
      },
    });
  }

  async addPaper(projectId: number, paperId: number) {
    return this.prisma.projectPaper.create({
      data: {
        projectId,
        paperId,
      },
    });
  }

  async removePaper(
    projectId: number,
    paperId: number,
  ) {
    return this.prisma.projectPaper.delete({
      where: {
        projectId_paperId: {
          projectId,
          paperId,
        },
      },
    });
  }

  async createPaperForProject(
    projectId: number,
    createPaperDto: CreatePaperDto,
    filename: string,
  ) {
    const paper = await this.paperService.create(
      createPaperDto,
      filename,
    );

    await this.prisma.projectPaper.create({
      data: {
        projectId,
        paperId: paper.id,
      },
    });

    return paper;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  remove(id: number) {
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}