import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ControlnatalService } from './controlnatal.service';
import { CreateControlnatalDto } from './dto/create-controlnatal.dto';
import { UpdateControlnatalDto } from './dto/update-controlnatal.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Controlnatal } from './entities/controlnatal.entity';

@Controller('controlnatal')
export class ControlnatalController {
  constructor(private readonly controlnatalService: ControlnatalService) {}

  @Post()
  create(@Body() createControlnatalDto: CreateControlnatalDto) {
    return this.controlnatalService.create(createControlnatalDto);
  }

  @Get()
  findAll() {
    return this.controlnatalService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControlnatalDto: UpdateControlnatalDto) {
    return this.controlnatalService.update(+id, updateControlnatalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlnatalService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const controlnatal = await this.controlnatalService.searchPatients(term);
    return controlnatal;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Controlnatal> = this.controlnatalService.createQueryBuilder('controlnatal');

    if (searchString) {
      builder.where('controlnatal.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('controlnatal.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    }

    const perPage = 7;

    if (page === undefined) {
      // If page is undefined, set it to 1 by default
      page = 1;
    }

    const [data, total] = await builder
        .offset((page - 1) * perPage)
        .limit(perPage)
        .getManyAndCount();

    const last_page = Math.ceil(total / perPage);

    return {
      data,
      total,
      page,
      last_page,
    };
  }

  


   @Get('report')
  async generateReport(): Promise<void> {
    await this.controlnatalService.generateReport();
   }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlnatalService.findOne(+id);
  }
}
