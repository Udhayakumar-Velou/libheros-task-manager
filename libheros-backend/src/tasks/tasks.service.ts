import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  /* ---------------- CREATE TASK ---------------- */
  async create(taskData: any, userId: number) {
    const task = this.taskRepository.create({
      shortDescription: taskData.shortDescription,
      longDescription: taskData.longDescription,
      dueDate: taskData.dueDate,
      completed: false,

      taskList: { id: taskData.taskListId } as any,
      user: { id: userId } as any,
    });

    return this.taskRepository.save(task);
  }

  /* ---------------- GET TASKS ---------------- */
  async findAll(listId: number, userId: number) {
    return this.taskRepository.find({
      where: {
        taskList: { id: listId },
        user: { id: userId },   // 🔥 IMPORTANT
      },
      relations: ['taskList'],
      order: { createdAt: 'DESC' },
    });
  }

  /* ---------------- UPDATE TASK ---------------- */
  async update(id: number, data: any, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) return null;

    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  /* ---------------- DELETE TASK ---------------- */
  async remove(id: number, userId: number) {
    return this.taskRepository.delete({
      id,
      user: { id: userId },
    });
  }
}