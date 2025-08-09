import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ...(process.env.USE_MONGO === 'true'
      ? [MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/bojex')]
      : []),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
