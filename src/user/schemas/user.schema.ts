import { Image } from 'src/image/schemas/image.schema';
import { Mosaic } from 'src/mosaic/schemas/mosaic.schema';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 1 })
  mosaic: number;

  @OneToMany((type) => Mosaic, (mosaic) => mosaic.userId, { eager: true })
  mosaics: Mosaic[];

  @OneToMany((type) => Image, (image) => image.userId, { eager: true })
  images: Image[];
}
