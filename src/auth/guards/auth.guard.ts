import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from "@nestjs/jwt";
import { payloadType, RequestWithUser } from "../utilities/types";
import { jwtConstants } from "../JWT/constant";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const request = ctx.getContext<{ req: RequestWithUser }>().req;
        const token = request.headers.authorization;

        if (!token) {
            throw new UnauthorizedException("No se ha proporcionado el token");
        }


        try {
            const payload: payloadType = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request.user = payload;
        } catch {
            throw new UnauthorizedException("Token no valido");
        }

        return true;
    }
}