import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    first_name: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    last_name: string

    @IsEmail({}, { message: 'El correo no tiene un formato válido' })
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    email: string

    @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    birth_date: string
}