import { Parcela } from "src/sistema-reserva/parcelas/parcelas.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingresos')
export class Ingreso {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'date', nullable: false })
    entrada: Date;

    @Column({ type: 'date', nullable: true })
    salida: Date;

    //persona que ingresa.
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({ name: 'userId' })
    usuario: Usuarios;

    //Parcela a la que entra.
    @ManyToOne(() => Parcela, parcela => parcela.id)
    @JoinColumn({ name: 'parcelaId' })
    parcela: Parcela;
}