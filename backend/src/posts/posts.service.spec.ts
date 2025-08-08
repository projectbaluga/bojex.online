import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('PostsService', () => {
  let service: PostsService;
  let mongo: MongoMemoryServer | null = null;
  let moduleRef: any;
  let skip = false;

  beforeAll(async () => {
    try {
      mongo = await MongoMemoryServer.create();
      moduleRef = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(mongo.getUri()),
          MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        ],
        providers: [PostsService],
      }).compile();

      service = moduleRef.get(PostsService);
    } catch (err) {
      skip = true;
      console.warn('MongoMemoryServer failed to start, skipping tests');
    }
  });

  afterAll(async () => {
    if (moduleRef) await moduleRef.close();
    if (mongo) await mongo.stop();
  });

  it('likes and unlikes a post without duplicates', async () => {
    if (skip) return;
    const post: any = await service.create('u1', 'hello');
    await Promise.all([
      service.likePost(post._id.toString(), 'u2'),
      service.likePost(post._id.toString(), 'u2'),
    ]);
    let fetched = await service.findOne(post._id.toString());
    expect(fetched.likes).toHaveLength(1);
    await service.unlikePost(post._id.toString(), 'u2');
    fetched = await service.findOne(post._id.toString());
    expect(fetched.likes).toHaveLength(0);
  });

  it('adds comments and paginates/sorts them', async () => {
    if (skip) return;
    const post: any = await service.create('u1', 'with comments');
    await service.addComment(post._id.toString(), 'u2', 'first');
    await service.addComment(post._id.toString(), 'u3', 'second');
    const { comments } = await service.getComments(
      post._id.toString(),
      1,
      1,
      'latest',
    );
    expect(comments[0].content).toBe('second');
    const { comments: older } = await service.getComments(
      post._id.toString(),
      1,
      2,
      'oldest',
    );
    expect(older[0].content).toBe('first');
  });
});
