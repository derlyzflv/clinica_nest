import { IsInt, IsPositive } from 'class-validator'

export class CreateDoctorDto {
    @IsInt({ message: 'El user_id debe ser un número entero' })
    @IsPositive({ message: 'El user_id debe ser mayor a 0' })
    user_id: number

    @IsInt({ message: 'El user_id debe ser un número entero' })
    @IsPositive({ message: 'El user_id debe ser mayor a 0' })
    specialty_id: number
}   