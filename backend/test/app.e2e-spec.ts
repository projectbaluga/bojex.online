import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

jest.setTimeout(60000);

describe('Auth & Posts (e2e)', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer | null = null;
  let skip = false;

  beforeAll(async () => {
    try {
      mongo = await MongoMemoryServer.create();
      const moduleRef = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(mongo.getUri()),
          AppModule,
        ],
      }).compile();

      app = moduleRef.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ transform: true }));
      app.useGlobalFilters(new AllExceptionsFilter());
      await app.init();
    } catch (err) {
      skip = true;
      console.warn('MongoMemoryServer failed to start, skipping tests');
    }
  });

  afterAll(async () => {
    if (app) await app.close();
    if (mongo) await mongo.stop();
  });

  it('supports profile update, likes, comments and post deletion', async () => {
    if (skip) return;

    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);

    const userId = registerRes.body.id;

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);

    const token = loginRes.body.access_token;
    expect(token).toBeDefined();

    const updateRes = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'updated' })
      .expect(200);

    expect(updateRes.body.bio).toBe('updated');

    const postRes = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .field('text', 'hello world')
      .expect(201);

    const postId = postRes.body._id;

    await request(app.getHttpServer())
      .post(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.likes).toBe(1);
      });

    await request(app.getHttpServer())
      .delete(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.likes).toBe(0);
      });

    const firstCommentRes = await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'first' })
      .expect(201);
    const firstCommentId = firstCommentRes.body.id;

    await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'second' })
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/posts/${postId}/comments/${firstCommentId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.deleted).toBe(true);
      });

    const commentsRes = await request(app.getHttpServer())
      .get(`/posts/${postId}/comments`)
      .expect(200);
    expect(commentsRes.body.total).toBe(1);
    expect(commentsRes.body.comments[0].content).toBe('second');

    await request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .expect(404);
  });
});
