import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { HashModule } from './hash/hash.module';

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
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    HashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
