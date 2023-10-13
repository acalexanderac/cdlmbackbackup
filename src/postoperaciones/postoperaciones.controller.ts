import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PostoperacionesService } from './postoperaciones.service';
import { CreatePostoperacioneDto } from './dto/create-postoperacione.dto';
import { UpdatePostoperacioneDto } from './dto/update-postoperacione.dto';
import { Postoperacione } from './entities/postoperacione.entity';
import { SelectQueryBuilder } from 'typeorm';

@Controller('postoperaciones')
export class PostoperacionesController {
  constructor(private readonly postoperacionesService: PostoperacionesService) {}

  @Post()
  create(@Body() createPostoperacioneDto: CreatePostoperacioneDto) {
    return this.postoperacionesService.create(createPostoperacioneDto);
  }

  @Get()
  findAll() {
    return this.postoperacionesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostoperacioneDto: UpdatePostoperacioneDto) {
    return this.postoperacionesService.update(+id, updatePostoperacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postoperacionesService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const postoperaciones = await this.postoperacionesService.searchPatients(term);
    return postoperaciones;
  }

 @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Postoperacione> = this.postoperacionesService.createQueryBuilder('postoperaciones');

    if (searchString) {
      builder.where(' postoperaciones.tipoCirugia ILIKE :s  OR postoperaciones.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('postoperaciones.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postoperacionesService.findOne(+id);
  }
}
