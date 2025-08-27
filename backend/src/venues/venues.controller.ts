import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VenueEntity } from './entities/venue.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Venues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiCreatedResponse({ type: VenueEntity })
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  @ApiOkResponse({ type: VenueEntity, isArray: true })
  findAll() {
    return this.venuesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VenueEntity })
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VenueEntity })
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VenueEntity })
  remove(@Param('id') id: string) {
    return this.venuesService.remove(id);
  }
}
