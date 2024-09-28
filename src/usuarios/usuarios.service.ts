import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UsuarioDto } from './usuarios.dto';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuarios) private readonly repo: Repository<UsuarioDto>,
        private readonly authService: AuthService
    ) { }
    /**
     * @description obtiene un usuario
     * @param id ID del usuario
     * @returns UsuarioDTO
     */
    async getOne(id: number): Promise<UsuarioDto> {
        try {
            const usuario = await this.repo.findOne({ where: { id } });

            if (!usuario) throw new NotFoundException('Usuario no encontrado');

            return usuario;
        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }

    async register(usuario: UsuarioDto) {
        try {
            //! the hash if doesn't exist the string
            if (!usuario.password) throw new UnauthorizedException('No password');

            const hash = await this.authService.hashPassword(usuario.password);
            usuario.password = hash;

            const result = await this.repo.save(usuario);
            return result;
        } catch (err: any) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<UsuarioDto[]> {
        try {
            const usuarios = await this.repo.find();

            if (!usuarios) throw new NotFoundException('Usuario no encontrado');

            return usuarios;
        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
    async login(email: string, password: string) {
        try {
            const user = await this.repo.findOne({ where: { email } });
            console.log(user);

            if (!user) throw new NotFoundException('Usuario no encontrado');

            const isPassword = await this.authService.comparePassword(
                password,
                user.password,
            );

            if (!isPassword) throw new UnauthorizedException('Contraseña incorrecta');

            const token = await this.authService.generateJwt(user);

            return token;
        } catch (err) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
}
