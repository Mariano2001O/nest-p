import { IsDate, IsOptional } from "class-validator";
import { ParcelasDto } from "src/parcelas/parcelas.dto";
import { UsuarioDto } from "src/usuarios/usuarios.dto";

export class IngresoDto {
    id: number;

    @IsDate()
    entrada: Date;

    @IsOptional()
    @IsDate()
    salida: Date

    usuario: UsuarioDto

    parcela: ParcelasDto
}