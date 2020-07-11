import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../users";
import { TransactionType } from ".";

@Entity("accounts")
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  userId: string;

  @ManyToOne((type) => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  user: UserEntity;

  @Column("int")
  value: number;

  @Column("varchar")
  transactionType: TransactionType;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
