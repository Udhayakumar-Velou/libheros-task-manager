import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { User } from '../users/user.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // ✅ FIXED RELATION
  @ManyToOne(() => User, (user) => user.taskLists, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}