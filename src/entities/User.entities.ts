import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import Role from './Role.entities'
import Busroute from "./Busroute.entities"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @ManyToOne(() => Role, (rol) => rol.role)
    role: Role

    @Column()
    password: string

    @Column({default: true})
    state: boolean

    @ManyToMany(()=>Busroute)
    @JoinTable()
    rutafav: Busroute[]
}

export default User