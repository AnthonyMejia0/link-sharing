import { ComponentType, SVGProps } from 'react';
import GitHubIcon from '@/assets/images/icon-github.svg';
import DevToIcon from '@/assets/images/icon-devto.svg';
import FrontendMentorIcon from '@/assets/images/icon-frontend-mentor.svg';
import CodewarsIcon from '@/assets/images/icon-codewars.svg';
import XIcon from '@/assets/images/icon-x.svg';
import FreeCodeCampIcon from '@/assets/images/icon-freecodecamp.svg';
import LinkedInIcon from '@/assets/images/icon-linkedin.svg';
import GitLabIcon from '@/assets/images/icon-gitlab.svg';
import YouTubeIcon from '@/assets/images/icon-youtube.svg';
import HashnodeIcon from '@/assets/images/icon-hashnode.svg';
import FacebookIcon from '@/assets/images/icon-facebook.svg';
import StackOverflowIcon from '@/assets/images/icon-stack-overflow.svg';
import TwitchIcon from '@/assets/images/icon-twitch.svg';

export type PlatformConfig = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  textColor: string;
  bgColor: string;
  borderColor?: string;
};

export const PLATFORMS = {
  github: {
    label: 'GitHub',
    icon: GitHubIcon,
    textColor: '#FFFFFF',
    bgColor: '#1A1A1A',
  },
  devto: {
    label: 'Dev.to',
    icon: DevToIcon,
    textColor: '#FFFFFF',
    bgColor: '#333333',
  },
  frontendmentor: {
    label: 'Frontend Mentor',
    icon: FrontendMentorIcon,
    textColor: '#000000',
    bgColor: '#FFFFFF',
    borderColor: '#D9D9D9',
  },
  codewars: {
    label: 'Codewars',
    icon: CodewarsIcon,
    textColor: '#FFFFFF',
    bgColor: '#8A1A50',
  },
  x: {
    label: 'X',
    icon: XIcon,
    textColor: '#FFFFFF',
    bgColor: '#000000',
  },
  freecodecamp: {
    label: 'freeCodeCamp',
    icon: FreeCodeCampIcon,
    textColor: '#FFFFFF',
    bgColor: '#302267',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    textColor: '#FFFFFF',
    bgColor: '#2D68FF',
  },
  gitlab: {
    label: 'GitLab',
    icon: GitLabIcon,
    textColor: '#FFFFFF',
    bgColor: '#EB4925',
  },
  youtube: {
    label: 'YouTube',
    icon: YouTubeIcon,
    textColor: '#FFFFFF',
    bgColor: '#EE3939',
  },
  hashnode: {
    label: 'Hashnode',
    icon: HashnodeIcon,
    textColor: '#FFFFFF',
    bgColor: '#0330D1',
  },
  facebook: {
    label: 'Facebook',
    icon: FacebookIcon,
    textColor: '#FFFFFF',
    bgColor: '#2442AC',
  },
  stackoverflow: {
    label: 'Stack Overflow',
    icon: StackOverflowIcon,
    textColor: '#FFFFFF',
    bgColor: '#EC7100',
  },
  twitch: {
    label: 'Twitch',
    icon: TwitchIcon,
    textColor: '#FFFFFF',
    bgColor: '#9147FF',
  },
} satisfies Record<string, PlatformConfig>;

export type PlatformKey = keyof typeof PLATFORMS;
