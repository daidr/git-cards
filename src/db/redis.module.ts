import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';

const config = {
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
  username: process.env.REDIS_USERNAME || '',
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_DB) || 0,
  ttl: 1000,
};

export default CacheModule.registerAsync<RedisClientOptions>({
  useFactory: async () => {
    return {
      store: await redisStore({
        ...config,
      }),
    };
  },
  isGlobal: true,
});
