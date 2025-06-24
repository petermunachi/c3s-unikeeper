import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int" })
  startDate: number;

  @Column({ type: "int" })
  workFrom: number;

  @Column({ type: "int" })
  workTo: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.tasks) 
  user: User; 

}