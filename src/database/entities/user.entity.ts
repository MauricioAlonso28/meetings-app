import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/user.enum";
import { Professional } from "./professional.entity";
import { Customer } from "./customer.entity";

@Entity('users')
export class User { 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  email: string

  @Column({
    nullable: true
  })
  password: string

  @Column({
    default: false
  })
  banned: boolean

  @Column({
    default: false,
  })
  disabled: boolean

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole

  @CreateDateColumn({
    name: "createdAt"
  })
  createdAt: Date

  @Column({
    name: "deleteAt",
    nullable: true
  })
  deleteAt: Date

  @OneToOne(() => Professional,
    (professional) => professional.user,
    { nullable: true }
  )
  professional: Professional

  @OneToOne(() => Customer,
    (customer) => customer.user,
    { nullable: true }
  )
  customer: Customer
}