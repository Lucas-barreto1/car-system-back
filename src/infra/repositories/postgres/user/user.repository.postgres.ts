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
  findUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getListOfUsers(id: string[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findUserByUsername(username: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
