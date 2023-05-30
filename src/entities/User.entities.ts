import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Role from './Role.entities'

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

    @Column({default: false})
    google: boolean

    @Column({default: true})
    state: boolean
}

export default User