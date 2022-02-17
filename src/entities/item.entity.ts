import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  todo: string;

  @Column()
  limit: Date;

  @Column('boolean', { default: false })
  idDone: boolean;

  @Column()
  deletePassword: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updateAt?: Date;
}
