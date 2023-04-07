import {
  Controller,
  Get,
  Param,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AVAILABLE_TEMPLATES, GIT_PLATFORMS, ICardInfo } from './card.types';

@Controller('c')
@UseInterceptors(CacheInterceptor)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(['/:platform/:owner/:repo', '/:platform/:owner/:repo.html'])
  @Render('card.hbs')
  renderCard(
    @Param('platform') platform: GIT_PLATFORMS,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
  ): ICardInfo {
    return {
      owner: 'test',
      repo: 'example',
      ownerLink: 'https://example.com/o',
      repoLink: 'https://example.com/r',
      description: '使用nodejs的sharp库反混淆明日方舟立绘',
      homepage: 'https://example.com',
      stars: 123,
      forks: 456,
      platform: {
        name: 'GitHub',
        icon: 'icon-github',
        colors: {
          default: '65 65 65',
          lighten: '93 93 93',
          text: '255 255 255',
        },
      },
      style: {
        template: AVAILABLE_TEMPLATES.xlog,
      },
    };
  }
}
