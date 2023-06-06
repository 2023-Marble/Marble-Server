import { User } from 'src/user/schemas/user.schema';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Mosaic extends BaseEntity {
  @PrimaryGeneratedColumn()
  mosaicId: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @ManyToOne((type) => User, (user) => user.mosaics, { eager: false })
  userId: User;
}
