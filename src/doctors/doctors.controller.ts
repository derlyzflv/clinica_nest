import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service.js';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/guards/decorators/roles.decorator.js';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) { }

    @Get()
    findAll() {
        return this.doctorsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doctorsService.findOne(Number(id))
    }

    @Post()
    create(@Body() dto: CreateDoctorDto) {
        return this.doctorsService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
        return this.doctorsService.update(Number(id), dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doctorsService.remove(Number(id))
    }

}
