import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class PatientsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.patients.findMany()
    }

    async findOne(id: number) {
        const patient = await this.prisma.patients.findUnique({
            where: { id },
        })
        if (!patient) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`)
        }
        return patient
    }

    create(data: {
        first_name: string,
        last_name: string,
        email: string,
        birth_date: string
    }) {
        return this.prisma.patients.create({ data: { ...data, birth_date: new Date(`${data.birth_date}T12:00:00.000Z`) } })
    }

    async update(id: number, data: {
        first_name?: string,
        last_name?: string,
        email?: string,
        birth_date?: string
    }) {

        await this.findOne(+id)

        return this.prisma.patients.update({
            where: { id },
            data: { ...data, birth_date: data.birth_date ? new Date(`${data.birth_date}T12:00:00.000Z`) : undefined }
        })
    }

    async remove(id: number) {

        await this.findOne(+id)

        return this.prisma.patients.delete({
            where: { id }
        })
    }
}