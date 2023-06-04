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
  image_id: number;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('simple-array')
  vector: number[];

  @ManyToOne((type) => User, (user) => user.mosaics, { eager: false })
  user_id: User;
}
