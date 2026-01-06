import { BadRequestException, InternalServerErrorException } from '@nestjs/common';


const BadRequestFunction = (mensaje: string): never => {
    throw new BadRequestException(mensaje)
}

const InternalExpectionFunction = (mensaje: string): never => {
    throw new InternalServerErrorException(mensaje)
}

export { BadRequestFunction, InternalExpectionFunction }