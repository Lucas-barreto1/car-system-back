import { Email } from 'src/domain/value-objects/email';
import { Id } from 'src/domain/value-objects/id';
import { UserName } from 'src/domain/value-objects/user-name';

export type UserInput = {
  id?: string;
  email: string;
  name: string;
  password?: string;
  createDate?: Date;
  updatedDate?: Date;
  roles?: string[];
};

export type UserDatabaseInput = {
  id: string;
  email: string;
  name: string;
  roles?: string[];
  createDate: Date;
  updatedDate: Date;
};

export class User {
  readonly id: string;
  readonly email: Email;
  readonly name: UserName;
  readonly password: string;
  readonly createDate: Date;
  readonly updatedDate: Date;

  roles: string[];

  constructor(userInput: UserInput) {
    this.id = new Id(userInput.id).toString();
    this.email = new Email(userInput.email);
    this.password = userInput.password;
    this.name = new UserName(userInput.name);
    this.createDate = userInput.createDate || new Date();
    this.updatedDate = userInput.updatedDate || new Date();
    this.roles = userInput.roles || [];
  }

  static restoreFromDatabase(userInput: UserDatabaseInput) {
    return new User({
      id: userInput.id,
      email: userInput.email,
      name: userInput.name,
      roles: userInput.roles || [],
      createDate: userInput.createDate || new Date(),
      updatedDate: userInput.updatedDate || new Date(),
    });
  }

  getRoles() {
    return this.roles;
  }

  setRoles(roles: string[]) {
    if (this.roles.length) return;
    this.roles = roles;
  }
}
