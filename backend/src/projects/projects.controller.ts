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

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(
      createProjectDto,
    );
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.remove(id);
  }

  // Remove paper ONLY from this project
  @Delete(':projectId/papers/:paperId')
  removePaper(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('paperId', ParseIntPipe) paperId: number,
  ) {
    return this.projectsService.removePaper(
      projectId,
      paperId,
    );
  }

  // Add an existing paper to this project
  @Post(':projectId/papers/:paperId')
  addPaper(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('paperId', ParseIntPipe) paperId: number,
  ) {
    return this.projectsService.addPaper(
      projectId,
      paperId,
    );
  }

  // Create a new paper AND add it to this project
  @Post(':projectId/papers')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads/papers',
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
  createPaperForProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.projectsService.createPaperForProject(
      projectId,
      {
        title: body.title,
        note: body.note,
      },
      file.filename,
    );
  }
}