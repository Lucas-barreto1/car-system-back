import { Email } from 'src/domain/value-objects/email';
import { Id } from 'src/domain/value-objects/id';
import { Password } from 'src/domain/value-objects/password';
import { UserName } from 'src/domain/value-objects/user-name';

export type UserInput = {
  id?: string;
  email: string;
  name: string;
  password: string;
  roles?: string[];
};

export class User {
  readonly id: string;
  readonly email: Email;
  readonly name: UserName;
  readonly password: Password;
  private roles: string[];

  constructor(userInput: UserInput) {
    this.id = new Id(userInput.id).toString();
    this.email = new Email(userInput.email);
    this.password = new Password(userInput.password);
    this.name = new UserName(userInput.name);
    this.roles = userInput.roles || [];
  }

  getRoles() {
    return this.roles;
  }

  setRoles(roles: string[]) {
    if (this.roles.length) return;
    this.roles = roles;
  }
}
