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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TicketEntity } from './entities/ticket.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiCreatedResponse({ type: TicketEntity })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOkResponse({ type: TicketEntity, isArray: true })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TicketEntity })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TicketEntity })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TicketEntity })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
