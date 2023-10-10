import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColposcopiaService } from './colposcopia.service';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';

@Controller('colposcopia')
export class ColposcopiaController {
  constructor(private readonly colposcopiaService: ColposcopiaService) {}

  @Post()
  create(@Body() createColposcopiaDto: CreateColposcopiaDto) {
    return this.colposcopiaService.create(createColposcopiaDto);
  }

  @Get()
  findAll() {
    return this.colposcopiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colposcopiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColposcopiaDto: UpdateColposcopiaDto) {
    return this.colposcopiaService.update(+id, updateColposcopiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colposcopiaService.remove(+id);
  }
}
