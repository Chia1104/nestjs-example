import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule, PostsModule, AuthModule, HashModule } from './modules';
import { typeOrmAsyncConfig } from './db/typeorm.config';

@Module({
  imports: [
    // Setup environment variables
    ConfigModule.forRoot(),
    // Connect to the database using TypeORM.
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    PostsModule,
    AuthModule,
    HashModule,
  ],
})
export class AppModule {}
