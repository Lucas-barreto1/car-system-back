export const IBCRYPT_SERVICE = 'IBCRYPT_SERVICE';

export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}
