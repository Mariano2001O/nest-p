import { Body, Controller, Post } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcela } from '../parcelas/parcelas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Repository } from 'typeorm';
import { ParcelasDto } from '../parcelas/parcelas.dto';
import { UsuarioDto } from 'src/usuarios/usuarios.dto';

@Controller('ingresos')
export class IngresosController {
    constructor(
        private readonly service: IngresosService,

    ) { }
    //Cargar una entrada
    @Post('entrada')
    async ocuparParcela(
        @Body('usuarioId') usuarioId: number,
        @Body('parcelaId') parcelaId: number,
    ){
        const result = this.service.ocuparParcela(usuarioId, parcelaId);
        return result;
    }
    //Cargar una salida
    @Post ('salida')
    async desocuparParcela(
        @Body ('usuarioId') usuarioId: number,
        @Body ('parcelaId') parcelaId: number,
        @Body ('ingresoId') ingresoId: number,
    )
{
    const result = this.service.desocuparParcela(parcelaId, usuarioId, ingresoId);
    return result
}
async update(){ }
}
