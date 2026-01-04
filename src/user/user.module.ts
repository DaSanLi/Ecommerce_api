import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver'
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UsersResolver, 
    UsersService
  ],
})
export class UserModule {}
