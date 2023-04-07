import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AVAILABLE_TEMPLATES, GIT_PLATFORMS, ICardContext } from './card.types';

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
    @Query('template') template: AVAILABLE_TEMPLATES = AVAILABLE_TEMPLATES.xlog,
  ): ICardContext {
    // 默认使用 xlog 模板
    if (!Object.values(AVAILABLE_TEMPLATES).includes(template)) {
      template = AVAILABLE_TEMPLATES.xlog;
    }

    const meta = {
      style: {
        template,
      },
      platform: {
        name: 'GitHub',
        icon: 'icon-github',
        colors: {
          default: '65 65 65',
          lighten: '93 93 93',
          text: '255 255 255',
        },
      },
    };

    // 检查 platform 是否合法
    if (!Object.values(GIT_PLATFORMS).includes(platform)) {
      return {
        error: '不支持的 Git 平台',
        ...meta,
      };
    }

    return {
      owner: 'test',
      repo: 'example',
      ownerLink: 'https://example.com/o',
      repoLink: 'https://example.com/r',
      description: '使用nodejs的sharp库反混淆明日方舟立绘',
      homepage: 'https://example.com',
      stars: 123,
      forks: 456,
      ...meta,
    };
  }
}
