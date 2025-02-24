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

  @Column()
  password: string

  @Column({
    nullable: true
  })
  name: string

  @Column({
    default: false
  })
  banned: boolean

  @Column({
    default: false
  })
  disabled: boolean

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER
  })
  role: UserRole

  @CreateDateColumn({
    name: "createdAt"
  })
  createdAt: Date

  @OneToOne(() => Professional,
    (professional) => professional.user
  )
  professional?: Professional

  @OneToOne(() => Customer,
    (customer) => customer.user
  )
  customer?: Customer
}