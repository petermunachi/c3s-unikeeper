import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Punch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  workFrom: number;

  @Column({ type: "int", nullable: true })
  workTo: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.punches) 
  user: User; 

}