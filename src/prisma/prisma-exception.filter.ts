import { ArgumentsHost, BadRequestException, Catch, ConflictException, ExceptionFilter, NotFoundException } from '@nestjs/common'
import { Response } from 'express'
import { Prisma } from '../generated/prisma/client.js'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        switch (exception.code) {

            case 'P2002':
                return response.status(409).json(new ConflictException('Ya existe un registro con ese valor único',).getResponse(),)
            case 'P2025':
                return response.status(404).json(new NotFoundException('Registro no encontrado',).getResponse(),)
            case 'P2003':
                return response.status(400).json(new BadRequestException('El recurso relacionado no existe',).getResponse(),)
            default:
                throw exception
        }
    }
}