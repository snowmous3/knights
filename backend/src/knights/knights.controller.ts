import {
  Controller,
  Query,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateKnightsDto } from './dto/create-knights.dto';
import { GetKnightsDto } from './dto/get-knights.dto';
import { UpdateKnightsDto } from './dto/update-knigths.dto';
import { KnightsService } from './knights.service';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Get('/')
  find(@Query() findDto: GetKnightsDto): Promise<CreateKnightsDto[]> {
    return this.knightsService.find(findDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<any> {
    return this.knightsService.findById(id);
  }

  @Post('/')
  create(@Body() createKnights: CreateKnightsDto): Promise<any> {
    return this.knightsService.create(createKnights);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() createKnights: UpdateKnightsDto,
  ): Promise<any> {
    return this.knightsService.update(id, createKnights);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.knightsService.delete(id);
  }
}
