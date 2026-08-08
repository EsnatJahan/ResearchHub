import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

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

  // =========================
  // Create project
  // =========================

  create(
    createProjectDto: CreateProjectDto,
    userId: number,
  ) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
    });
  }

  // =========================
  // Get user's projects
  // =========================

  findAll(userId: number) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =========================
  // Get one project
  // =========================

  async findOne(
    id: number,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          papers: {
            include: {
              paper: true,
            },
          },
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return project;
  }

  // =========================
  // Update project
  // =========================

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  // =========================
  // Delete project
  // =========================

  async remove(
    id: number,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }

  // =========================
  // Add existing paper
  // =========================

  async addPaper(
    projectId: number,
    paperId: number,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return this.prisma.projectPaper.create({
      data: {
        projectId,
        paperId,
      },
    });
  }

  // =========================
  // Remove paper
  // =========================

  async removePaper(
    projectId: number,
    paperId: number,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return this.prisma.projectPaper.delete({
      where: {
        projectId_paperId: {
          projectId,
          paperId,
        },
      },
    });
  }

  // =========================
  // Create paper for project
  // =========================

  async createPaperForProject(
    projectId: number,
    createPaperDto: CreatePaperDto,
    filename: string,
    userId: number,
  ) {
    const project =
      await this.prisma.project.findFirst({
        where: {
          id: projectId,
          userId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    const paper =
      await this.paperService.create(
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
}