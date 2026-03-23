import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './task-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  // ✅ CREATE LIST (WITH USER)
  async create(name: string, userId: number) {
    const list = this.taskListRepository.create({
      name,
      user: { id: userId }, // 🔥 attach user
    });

    return this.taskListRepository.save(list);
  }

  // ✅ GET ONLY USER LISTS
  findAll(userId: number) {
    return this.taskListRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' }, // 🔥 filter by user
    });
  }

  // ✅ DELETE LIST (OPTIONAL: secure)
  async remove(id: number, userId: number) {
    return this.taskListRepository.delete({
      id,
      user: { id: userId }, // 🔥 only delete own list
    });
  }
}