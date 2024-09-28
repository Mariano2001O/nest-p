import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParcelasDto } from '../parcelas/parcelas.dto';
import { Repository } from 'typeorm';
import { UsuarioDto } from 'src/usuarios/usuarios.dto';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Parcela } from '../parcelas/parcelas.entity';
import { IngresoDto } from './ingresos.dto';
import { ParcelasService } from '../parcelas/parcelas.service';
import { Ingreso } from './ingresos.entity';

@Injectable()
export class IngresosService {
    constructor(
        @InjectRepository(Ingreso)
        private readonly IngresoRepository: Repository<IngresoDto>,
        @InjectRepository(Parcela)
        private readonly parcelaRepository: Repository<ParcelasDto>,
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<UsuarioDto>,
        private readonly parcelasService: ParcelasService
    ) { }

}
