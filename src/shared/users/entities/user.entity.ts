import { getEncryptedString, getHashedString } from "@/core/utils/crypto.util";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  public firstName!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  public lastName!: string;

  @Column({ type: "varchar", length: 60, select: true, unique: true })
  public email!: string;

  @Column({ type: "varchar", length: 500 })
  public password!: string;

  @Column({ type: "varchar", length: 500 })
  public encPassword!: string;

  @Column({ type: "varchar", nullable: true })
  public permissions!: string;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const encrypted = await getEncryptedString(this.password);
    const hashed = await getHashedString(this.password);
    this.encPassword = encrypted;
    this.password = hashed;
  }
}
