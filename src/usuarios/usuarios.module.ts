import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (ConfigService: ConfigService) => ({
            secret: ConfigService.get('JWT_SEED'),
            signOptions: {
                expiresIn: '24h',
            },
        }),
    }),
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, AuthService],
    exports: [AuthService, UsuariosService],
})
export class UsuariosModule { }
