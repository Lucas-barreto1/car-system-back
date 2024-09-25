import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user/user';
import {
  DATABASE_CONNECTION,
  DatabaseConnection,
} from 'src/infra/database/database-connection';

export class UserRepositoryPostgres implements UserRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseConnection: DatabaseConnection,
  ) {}

  async findUserById(id: string): Promise<User> {
    console.log('id', id);
    const connection = await this.databaseConnection.connect();
    const userData = await connection('users').where({ id }).first();
    if (!userData) {
      return null;
    }

    return new User(userData);
  }

  async getListOfUsers(id: string[]): Promise<User[]> {
    const connection = await this.databaseConnection.connect();
    const usersData = await connection('users').whereIn('id', id);
    return usersData.map((userData) => {
      return new User({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createDate: userData.create_date,
        updatedDate: userData.update_date,
        roles: userData.roles,
      });
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const connection = await this.databaseConnection.connect();
    const userData = await connection('users').where('email', email).first();
    console.log(userData);
    if (!userData) {
      return null;
    }

    return new User(userData);
  }

  async findUserByUsername(username: string): Promise<User> {
    const connection = await this.databaseConnection.connect();
    const userData = await connection('users').where('email', username).first();
    console.log(userData);

    if (!userData) {
      return null;
    }

    return new User(userData);
  }
}
