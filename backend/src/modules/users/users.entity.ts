import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity("users")
@Unique(["email"])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  token: string | null;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
