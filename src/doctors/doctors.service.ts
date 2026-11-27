import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class DoctorsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.doctors.findMany()
    }

    findOne(id: number) {
        const doctor = this.prisma.doctors.findUnique({
            where: { id }
        })

        // if (!doctor)
        // throw new NotFoundException('Doctor not found')
        return doctor
    }

    create(data: {
        user_id: number,
        specialty_id: number
    }) {
        return this.prisma.doctors.create({
            data
        })
    }
    update(id: number, data: {
        user_id?: number,
        specialty_id?: number
    }) {
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