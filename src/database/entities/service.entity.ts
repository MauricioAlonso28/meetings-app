import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Professional } from "./professional.entity";

@Entity("services")
export class Service { 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string

  @ManyToOne(() => Professional, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "userId"
  })
  user: Professional;

  @Column()
  title: string

  @Column({
    type: "varchar",
    length: 1000,
  })
  description: string

  @Column()
  price: number

  @Column()
  duration: number

  @Column({
    default: false,
  })
  disabled: boolean

  @Column({
    default: false,
  })
  banned: boolean
  
  @Column({
    name: "updateAt",
    nullable: true
  })
  updateAt: Date

  @CreateDateColumn({
    name: "createdAt"
  })
  createdAt: Date
}

