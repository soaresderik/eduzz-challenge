import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../users";

@Entity("investments")
export default class Investment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  purchaseAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 8 })
  cryptoAmount: number;

  @Column("int")
  purchaseCryptoPrice: number;

  @ManyToOne((type) => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
