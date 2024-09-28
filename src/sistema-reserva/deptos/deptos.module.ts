import { Module } from '@nestjs/common';
import { DeptosController } from './deptos.controller';
import { DeptosService } from './deptos.service';

@Module({
  controllers: [DeptosController],
  providers: [DeptosService]
})
export class DeptosModule {}
