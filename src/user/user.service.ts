import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { BadRequestFunction, InternalExpectionFunction } from './utilities/scripts';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { hashPassword } from '../auth/utilities/scripts';

@Injectable()
export class UsersService {

  constructor( @InjectRepository(User) private readonly UserRepository: Repository<User> ) { }


  async createUser(body: CreateUserDto): Promise<User> {
    const passwordHashed = await hashPassword(body.password)
    body.password = passwordHashed
    const newUser = await this.UserRepository.save(body)
    if (!newUser) return InternalExpectionFunction("No se ha podido registrar al usuario")
    return newUser;
  }


  async findAllUsers(): Promise<User[]> {
    return await this.UserRepository.find();
  }


  async findOneUser(id: string): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("No se ha encontrado un usuario referente")
    return user
  }


  async updateUser(id: string, body: UpdateUserDto): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("No se ha encontrado un usuario referente")
    let passwordHashed: string | null = null
    if (body?.password) {
      passwordHashed = await hashPassword(body?.password)
      body.password = passwordHashed
    }
    const updatedUser = await this.UserRepository.update(id, { ...body });
    if(!updatedUser) return InternalExpectionFunction("No se ha podido actualizar el usuario")
    return "Usuario actualizado con exito";
  }


  async softDeleteUSer(id: string): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    const fecha = new Date()
    if (!user) return BadRequestFunction("Usuario no encontrado")
    const deleteUser = await this.UserRepository.softDelete({ id })
    if(!deleteUser) return InternalExpectionFunction("El usuario no se pudo borrar")
    return "Se realizo el borrado blando del usuario satisfactoriamente"
  }


  async cancelSoftDelete(id: string): Promise<string> {
    //se busca a los usuarios previamente borrados
    const usersDeletedRepository = await this.UserRepository.find({ withDeleted: true, where: { deletedAt: Not(IsNull()) } })
    //testifico si el id enviado esta dentro del los  usuarios eliminados
    const userIsDeleted = usersDeletedRepository.find((users) => String(users.id) === String(id))
    // console.log(userIsDeleted, "usuario cancel soft deleted")
    if (!userIsDeleted) return BadRequestFunction("Usuario no encontrado en la lista de borrado blando")
    //se restauran los datos del usuario
    const userResult = await this.UserRepository.restore({ id })
    if(!userResult) return InternalExpectionFunction("No se pudo sacar al usuario de la lista de eliminados")
    return "Se quito al usuario de la lista de borrado blando satisfactoriamente"
  }


  //esta logica sera usada por REST API
  async hardDelete(id: string): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("Usuario no encontrado")
    try {
      await this.UserRepository.remove(user);
    } catch {
      InternalExpectionFunction("No se ha podido borrar al usuario")
    }
    return "Usuario borrado satisfactoriamente"
  }

}