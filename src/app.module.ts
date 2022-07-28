import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { HashModule } from './modules/hash/hash.module';

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
