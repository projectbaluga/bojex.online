import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/bojex'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
})
export class AppModule {}
