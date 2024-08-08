export class Password {
  constructor(private password: string) {
    if (!password) {
      throw new Error('Password is required');
    }
    if (!this.isValidPassword(password)) {
      throw new Error('Password is invalid');
    }
  }

  getValue() {
    return this.password;
  }

  private isValidPassword(password: string): boolean {
    //  uma senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas, números e caracteres especiais.
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}
