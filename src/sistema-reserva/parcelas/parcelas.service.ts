import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcela } from './parcelas.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ParcelasDto } from './parcelas.dto';

@Injectable()
export class ParcelasService {
    @InjectRepository(Parcela)
    private readonly parcelaRepository: Repository<ParcelasDto>

    async getOne(id: number): Promise<ParcelasDto> {
        try {

            const parcela = await this.parcelaRepository.findOne({ where: { id } });

            if (!parcela) throw new NotFoundException('parcela no encontrado');

            return parcela;
        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
    async getAll(): Promise<ParcelasDto[]> {
        try {
            const parcelas = await this.parcelaRepository.find();

            if (!parcelas) throw new NotFoundException('parcela no encontrado');

            return parcelas;
        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
}
