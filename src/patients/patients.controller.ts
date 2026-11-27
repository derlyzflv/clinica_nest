import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
} from '@nestjs/common'
import { PatientsService } from './patients.service.js'
import { CreatePatientDto } from './dto/create-patient.dto.js'
import { UpdatePatientDto } from './dto/update-patient.dto.js'

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Get()
    findAll() {
        return this.patientsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(Number(id))
    }

    @Post()
    create(@Body() dto: CreatePatientDto) {
        return this.patientsService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
        return this.patientsService.update(Number(id), dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.patientsService.remove(Number(id))
    }
}