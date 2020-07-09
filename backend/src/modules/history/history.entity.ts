import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("histories")
export default class History extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  buy: number;

  @Column("int")
  sell: number;

  @CreateDateColumn()
  createdAt: Date;
}
