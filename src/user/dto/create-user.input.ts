import { Field, InputType } from '@nestjs/graphql';
import { IsString,  MinLength, MaxLength, IsNotEmpty } from 'class-validator';

@InputType({ description: "El campo username y password son obligatorios proporcionarlos para crear un nuevo usuario"})
export class CreateUserDto {


    @Field()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    username: string;


    @Field()
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    password: string;

}