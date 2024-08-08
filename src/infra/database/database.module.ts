import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { DATABASE_CREDENTIALS } from './database-credentials';
import { EnvDatabaseCredentials } from './env-database-credentials';
import { KnexAdapterService } from './knex-adapter.service';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useClass: KnexAdapterService,
    },
    {
      provide: DATABASE_CREDENTIALS,
      useClass: EnvDatabaseCredentials,
    },
  ],
  exports: [DATABASE_CONNECTION, DATABASE_CREDENTIALS],
})
export class DatabaseModule {}
