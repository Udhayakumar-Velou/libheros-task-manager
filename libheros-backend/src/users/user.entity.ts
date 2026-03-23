import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { TaskList } from '../task-lists/task-list.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // ✅ THIS FIXES YOUR ERROR
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
  @OneToMany(() => TaskList, (list) => list.user)
taskLists: TaskList[];
}