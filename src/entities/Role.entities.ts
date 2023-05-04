import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import User from './User.entities'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, default: "USER" })
  role: string

  @OneToMany(() => User, (user) => user.role)
  user: User[]
}

export default Role