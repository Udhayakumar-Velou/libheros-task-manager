import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // 🔥 FIXED
      autoLoadEntities: true,
      synchronize: true,

      // 🔥 REQUIRED FOR RAILWAY
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    UsersModule,
    TaskListsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}