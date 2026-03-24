import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TaskList } from '../task-lists/task-list.entity';
import { User } from '../users/user.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortDescription: string;

  @Column({ nullable: true })
  longDescription: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  taskList: TaskList;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}