import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parcela')
export class Parcela {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true })
    nombre: string;

    @Column({ type: 'boolean' })
    ocupada: boolean;
}