import { Knex } from 'knex';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export type Database = Knex;
export type Transaction = Knex.Transaction;

export interface DatabaseConnection {
  connect(): Promise<Database>;
  close(): Promise<void>;
}
