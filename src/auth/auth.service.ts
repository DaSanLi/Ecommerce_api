import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserClass, userResponse } from './utilities/types';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/auth.dto';
import { verifyHashPassword } from './utilities/scripts';
import { BadRequestFunction } from '../user/utilities/scripts';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<userResponse>,
        private readonly jwtService: JwtService
    ) { }


    async loginUser(body: LoginDto): Promise<UserClass> {
        const { username } = body;
        const user = await this.userRepository.findOneBy({ username });
        //verificacion de usuario valido
        if (!user) {
            throw new BadRequestException("Usuario no encontrado")
        }
        // verificacion de contraseña
        const passwordVerified = await verifyHashPassword(body.password, user.password)
        // si la variable es falsy enviara error 4xx
        if(!passwordVerified) return BadRequestFunction("La contraseña ingresada no coincide con la registrada")
        // gestion para crear JWT token
        const payload = { username: user.username }
        const token = await this.jwtService.signAsync(payload)
        //se gestiona los datos que se ennviaran dentro de la respuesta
        const response = { username: user.username, token: token }
        return response
    }

}