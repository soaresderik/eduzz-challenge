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

type TransactionType = "deposit" | "investment" | "liquidation";

@Entity("accounts")
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => UserEntity)
  @JoinColumn()
  account: UserEntity;

  @Column("int")
  value: number;

  @Column("varchar")
  transactionType: TransactionType;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
