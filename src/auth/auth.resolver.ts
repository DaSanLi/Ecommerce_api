import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service'
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UserClass } from './utilities/types';
import { LoginDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService){}
    
    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Requiere las credenciales de un usuario registrado y devuelve un token"})
    async login(@Args('body') body: LoginDto): Promise<UserClass> {
        return this.authService.loginUser(body);
    }

}