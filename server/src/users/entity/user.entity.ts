import { Activity } from 'src/activities/entity/activity.entity';
import { Punch } from 'src/punches/entity/punch.entity';
import { Task } from 'src/tasks/entity/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Punch, (punch) => punch.user)
  punches: Punch[];
}
