import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ProfessionalVisibility } from "../enums/user.enum";

@Entity('professionals')
export class Professional {
  @PrimaryGeneratedColumn("uuid")
  userId: string

  @OneToOne(() => User, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "userId"
  })
  user: User

  @Column({
    nullable: true
  })
  lastname: string

  @Column({
    type: "date",
    nullable: true
  })
  age: Date

  @Column({
    type: "varchar",
    length: 560,
    nullable: true
  })
  description: string

  @Column({
    type: "image",
    nullable: true
  })
  image: string

  @Column({
    nullable: true
  })
  specialization: string

  @Column({
    type: "enum",
    enum: ProfessionalVisibility,
    default: ProfessionalVisibility.PRIVATE
  })
  visibility: ProfessionalVisibility
}