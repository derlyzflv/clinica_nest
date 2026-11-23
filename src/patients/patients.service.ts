import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class PatientsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.patients.findMany()
    }
}