import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { JwtGuard } from '../auth/jwt.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.create(
      createProjectDto,
      userId,
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() req: any) {
    const userId = req.user.sub;

    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.findOne(
      id,
      userId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.update(
      id,
      updateProjectDto,
      userId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.remove(
      id,
      userId,
    );
  }

  @Delete(':projectId/papers/:paperId')
  @UseGuards(JwtGuard)
  removePaper(
    @Param('projectId', ParseIntPipe)
    projectId: number,

    @Param('paperId', ParseIntPipe)
    paperId: number,

    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.removePaper(
      projectId,
      paperId,
      userId,
    );
  }

  @Post(':projectId/papers/:paperId')
  @UseGuards(JwtGuard)
  addPaper(
    @Param('projectId', ParseIntPipe)
    projectId: number,

    @Param('paperId', ParseIntPipe)
    paperId: number,

    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.addPaper(
      projectId,
      paperId,
      userId,
    );
  }

  @Post(':projectId/papers')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads/papers',

        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(
              Math.random() * 1e9,
            ) +
            extname(file.originalname);

          cb(null, uniqueName);
        },
      }),
    }),
  )
  createPaperForProject(
    @Param(
      'projectId',
      ParseIntPipe,
    )
    projectId: number,

    @UploadedFile()
    file: Express.Multer.File,

    @Body() body: any,

    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.projectsService.createPaperForProject(
      projectId,
      {
        title: body.title,
        note: body.note,
      },
      file.filename,
      userId,
    );
  }
}