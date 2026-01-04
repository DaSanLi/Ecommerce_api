import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
}

const BadRequestFunction = (mensaje: string): never => {
    throw new BadRequestException(mensaje)
}

const InternalExpectionFunction = (mensaje: string): never => {
    throw new InternalServerErrorException(mensaje)
}

export { BadRequestFunction, InternalExpectionFunction, hashPassword }