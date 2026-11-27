import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';

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

    create(data: CreatePatientDto) {
        const dateOnly = data.birth_date.split('T')[0]
        return this.prisma.patients.create({ data: { ...data, birth_date: new Date(`${dateOnly}T12:00:00.000Z`) } })
    }

    async update(id: number, data: UpdatePatientDto) {

        // await this.findOne(Number(id))

        const dateOnly = data.birth_date?.split('T')[0]

        return this.prisma.patients.update({
            where: { id },
            data: { ...data, birth_date: dateOnly ? new Date(`${dateOnly}T12:00:00.000Z`) : undefined }
        })
    }

    async remove(id: number) {

        // await this.findOne(Number(id))

        return this.prisma.patients.delete({
            where: { id }
        })
    }
}