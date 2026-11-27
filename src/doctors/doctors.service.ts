import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';

@Injectable()
export class DoctorsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.doctors.findMany()
    }

    async findOne(id: number) {
        const doctor = await this.prisma.doctors.findUnique({
            where: { id }
        })

        if (!doctor)
            throw new NotFoundException(`Doctor con ID ${id} no encontrado`)
        return doctor
    }

    create(data: CreateDoctorDto) {
        return this.prisma.doctors.create({
            data
        })
    }
    update(id: number, data: UpdateDoctorDto) {
        return this.prisma.doctors.update({
            where: { id },
            data
        })
    }

    remove(id: number) {
        return this.prisma.doctors.delete({
            where: { id }
        })
    }
}