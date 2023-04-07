export enum GIT_PLATFORMS {
  'github' = 'github',
}

export interface ICardInfo {
  owner: string;
  ownerLink: string;
  repo: string;
  repoLink: string;
  description?: string;
  homepage?: string;
  stars: number;
  forks: number;
  platform: IplatformMeta;
  style: ICardStyle;
}

export interface IplatformMeta {
  name: string;
  icon: string;
  colors: {
    default: string;
    lighten: string;
    text: string;
  };
}

export enum AVAILABLE_TEMPLATES {
  'xlog' = 'xlog',
}

export type ICardStyle =
  | {
      template: AVAILABLE_TEMPLATES;
    }
  | {
      style: string;
    };
