import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: "Representa un usuario y sus credenciales" })
export class User {

    @PrimaryGeneratedColumn( 'increment' )
    @Field(() => ID, { description: "Identificador unico de usuario" })
    id: string 

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    @Field(() => String, { description: "Nombre de usuario"})
    username: string;

    @Column({ type: "varchar", nullable: false })
    @Field(() => String, {description: "Contraseña de usuario"})
    password: string;

    @DeleteDateColumn()
    @Field(() => Date, { nullable: true, description: "Muestra si el usuario ha sido borrado" })
    deletedAt?: Date|null;
}