import { User } from 'src/user/schemas/user.schema';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  vector: string;

  @ManyToOne((type) => User, (user) => user.mosaics, { eager: false })
  userId: number;
}
