import { IsString } from "class-validator";

export class ParcelasDto {
    id: number;

    @IsString()
    nombre: string;

}