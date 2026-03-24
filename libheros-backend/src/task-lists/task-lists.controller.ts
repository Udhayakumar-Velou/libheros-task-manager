import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task-lists')
export class TaskListsController {
  constructor(private taskListsService: TaskListsService) {}

  @Post()
  create(@Body() body: any, @Req() req) {
    console.log("REQ USER:", req.user);
    return this.taskListsService.create(body.name, req.user.sub);
  }

  @Get()
  findAll(@Req() req) {
    return this.taskListsService.findAll(req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.taskListsService.remove(Number(id), req.user.sub);
  }
}