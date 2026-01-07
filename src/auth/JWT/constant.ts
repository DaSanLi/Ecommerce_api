import dotenv from 'dotenv'; 

dotenv.config();
//aqui se firma el token con la palabra secreta ingesada en la variable de entorno
export const jwtConstants = {
    secret: process.env.secret,
}