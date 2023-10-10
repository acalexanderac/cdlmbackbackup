import { Module } from '@nestjs/common';
import { ColposcopiaService } from './colposcopia.service';
import { ColposcopiaController } from './colposcopia.controller';

@Module({
  controllers: [ColposcopiaController],
  providers: [ColposcopiaService],
})
export class ColposcopiaModule {}
