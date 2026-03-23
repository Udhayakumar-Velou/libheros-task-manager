import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-list.entity';
import { TaskListsService } from './task-lists.service';
import { TaskListsController } from './task-lists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  providers: [TaskListsService],
  controllers: [TaskListsController],
})
export class TaskListsModule {}