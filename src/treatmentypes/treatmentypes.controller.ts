import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentypesService } from './treatmentypes.service';
import { CreateTreatmentypeDto } from './dto/create-treatmentype.dto';
import { UpdateTreatmentypeDto } from './dto/update-treatmentype.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';

@Auth(Role.ADMIN)
@Controller('treatmentypes')
export class TreatmentypesController {
  constructor(private readonly treatmentypesService: TreatmentypesService) {}

  @Post()
  create(@Body() createTreatmentypeDto: CreateTreatmentypeDto) {
    return this.treatmentypesService.create(createTreatmentypeDto);
  }

  @Get()
  findAll() {
    return this.treatmentypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.treatmentypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTreatmentypeDto: UpdateTreatmentypeDto) {
    return this.treatmentypesService.update(id, updateTreatmentypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.treatmentypesService.remove(id);
  }
}
