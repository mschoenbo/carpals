import {User} from '@prisma/client';
import type {Icon} from 'lucide-react';

import {Icons} from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  settingsNav: SidebarNavItem[];
};

export type Car = {
  id: string;
  make: string;
  model: string;
  year: Date;
  color: string;
  fuel: 'DIESEL' | 'GAS' | 'EV';
  fin?: string;
};
