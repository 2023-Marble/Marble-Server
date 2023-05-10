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
  user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 1 })
  mosaic: number;

  @OneToMany((type) => Mosaic, (mosaic) => mosaic.user_id, { eager: true })
  mosaics: Mosaic[];

  @OneToMany((type) => Image, (image) => image.user_id, { eager: true })
  images: Image[];
}
