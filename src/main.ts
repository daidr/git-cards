import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { CardModule } from './card.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import Handlebars from 'handlebars';

Handlebars.registerHelper('print_color_var', function (obj) {
  return `--color-${obj.data.key}:${this};`;
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CardModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/static/',
  });
  app.setViewEngine({
    engine: {
      handlebars: Handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });
  await app.listen(3000);
}
bootstrap();
