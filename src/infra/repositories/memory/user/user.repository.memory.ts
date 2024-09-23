/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user/user';
import { roles } from 'src/infra/auth/roles';
import { BcryptService } from 'src/infra/services/bcrypt.service';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  user: any;

  constructor() {
    this.user = [];
  }
  findUserByEmail(email: string): Promise<User> {
    return this.user.find((user) => user.email === email);
  }

  async findUserById(_id: string): Promise<User> {
    const newUser = new User({
      id: '54abdb77-67b4-4c5a-a76f-8825cad21917',
      email: 'teste@gmail.com',
      name: 'name',
      password: await new BcryptService().hash(']#h5rHP4+,QrMHfgbTj>'),
      createDate: new Date(),
      updatedDate: new Date(),
      roles: [roles.ADMIN],
    });
    return newUser;
  }

  async findUserByUsername(_username: string): Promise<User> {
    const newUser = new User({
      id: '54abdb77-67b4-4c5a-a76f-8825cad21917',
      email: 'teste@gmail.com',
      name: 'name',
      password: await new BcryptService().hash(']#h5rHP4+,QrMHfgbTj>'),
      createDate: new Date(),
      updatedDate: new Date(),
      roles: [roles.ADMIN],
    });
    return newUser;
  }

  async save(user: User): Promise<void> {
    this.user.push(user);
  }

  async getListOfUsers(id: string[]): Promise<User[]> {
    return this.user.filter((user) => id.includes(user.id));
  }
}
