import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UsuarioDto } from './usuarios.dto';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly service: UsuariosService) { }

    @Post('auth/register')
    async register(@Body() usuario: UsuarioDto, @Res() response: Response) {
        const result = await this.service.register(usuario);
        response
            .status(HttpStatus.CREATED)
            .json({ ok: true, result, msg: 'creado' });
    }
    @Post('auth/login')
    async login(
        @Body() usuario: { email: string; password: string },
        @Res() res: Response,
    ) {
        const token = await this.service.login(usuario.email, usuario.password);
        res.status(HttpStatus.OK).json({ ok: true, token, msg: 'approved' });
    }

    @Get(':id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
        const usuario = await this.service.getOne(id);
        res.status(HttpStatus.OK).json({ ok: true, usuario, msg: 'approved' });
    }

    @Get('/')
    async getAll(@Res() res: Response) {
        const usuarios = await this.service.getAll();
        res.status(HttpStatus.OK).json({ ok: true, usuarios, msg: 'approved' });
    }
}