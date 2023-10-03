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

  @Column('longtext')
  vector: string;

  @ManyToOne((type) => User, (user) => user.images, { eager: false })
  userId: number;
}
