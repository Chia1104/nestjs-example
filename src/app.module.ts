import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule, PostsModule, AuthModule, HashModule } from './modules';

@Module({
  imports: [
    // Setup environment variables
    ConfigModule.forRoot(),
    // Connect to the database using TypeORM.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      migrations: ['src/db/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
      // Only for development
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    HashModule,
  ],
})
export class AppModule {}
