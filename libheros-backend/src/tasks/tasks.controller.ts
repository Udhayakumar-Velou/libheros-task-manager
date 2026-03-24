import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() body: any, @Req() req) {
    return this.tasksService.create(body, req.user.sub);
  }

  @Get()
  findAll(@Query('listId') listId: number, @Req() req) {
    return this.tasksService.findAll(listId, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.tasksService.update(Number(id), body, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(Number(id), req.user.sub);
  }
}