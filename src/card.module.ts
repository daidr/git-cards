import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import RedisModule from './db/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
