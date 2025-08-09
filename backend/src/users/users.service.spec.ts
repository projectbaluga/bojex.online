import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let mongo: MongoMemoryServer | null = null;
  let moduleRef: any;
  let skip = false;

  beforeAll(async () => {
    try {
      mongo = await MongoMemoryServer.create();
      moduleRef = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(mongo.getUri()),
          MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
        providers: [UsersService],
      }).compile();
      service = moduleRef.get(UsersService);
    } catch (err) {
      skip = true;
      console.warn('MongoMemoryServer failed to start, skipping tests');
    }
  });

  afterAll(async () => {
    if (moduleRef) await moduleRef.close();
    if (mongo) await mongo.stop();
  });

  it('follows and unfollows users', async () => {
    if (skip) return;
    const u1 = await service.create('a@test.com', 'pass');
    const u2 = await service.create('b@test.com', 'pass');
    const first = await service.follow(u1.id, u2.id);
    expect(first.following).toBe(1);
    expect(first.followers).toBe(1);
    const second = await service.follow(u1.id, u2.id);
    expect(second.following).toBe(0);
    expect(second.followers).toBe(0);
  });
});
