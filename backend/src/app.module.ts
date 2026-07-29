import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaperModule } from './paper/paper.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PaperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}