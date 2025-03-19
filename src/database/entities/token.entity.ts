import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string

  @Column({
    unique: true
  })
  token: string

  @CreateDateColumn({
    name: "createdAt"
  })
  createdAt: Date

  @Column({
    type: "timestamp"
  })
  expiresAt: Date
}