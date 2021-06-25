import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, CatModule],
})
export class AppModule {}
