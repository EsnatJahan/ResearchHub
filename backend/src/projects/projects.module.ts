import { Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

import { PaperModule } from '../paper/paper.module';

@Module({
  imports: [PaperModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}