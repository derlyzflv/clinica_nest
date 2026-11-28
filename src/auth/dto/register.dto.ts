import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
} from 'class-validator';
import { user_role } from '../../generated/prisma/enums.js';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(100)
    password!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    @IsEnum(user_role)
    role?: user_role;
}