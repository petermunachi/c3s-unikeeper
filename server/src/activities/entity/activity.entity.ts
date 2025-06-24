import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "int" })
  lastLogin: number;

  @Column({ type: "int", default: null })
  lastLogout: number;

  @Column({ type: "uuid", default: null })
  lastPunchId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}