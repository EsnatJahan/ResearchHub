import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaperModule } from './paper/paper.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { DatasetModule } from './dataset/dataset.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, PaperModule, ProjectsModule, DatasetModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}