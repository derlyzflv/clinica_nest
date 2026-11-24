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

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Get()
    findAll() {
        return this.patientsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(+id)
    }

    @Post()
    create(@Body() body: {
        first_name: string
        last_name: string
        email: string
        birth_date: string
    }) {
        const { first_name, last_name, email, birth_date } = body
        return this.patientsService.create({
            first_name,
            last_name,
            email,
            birth_date
        })
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: {
        first_name?: string
        last_name?: string
        email?: string
        birth_date?: string
    }) {
        return this.patientsService.update(+id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.patientsService.remove(+id)
    }
}