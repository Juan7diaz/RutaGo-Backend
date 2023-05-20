import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Busroute {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ default: true })
  isActive: boolean

  @Column({ type: 'jsonb' })
  route: Array<Array<number>>;

}

export default Busroute