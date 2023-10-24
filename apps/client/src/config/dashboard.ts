import {DashboardConfig} from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Settings',
      href: '/settings',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
  ],
  settingsNav: [
    {
      title: 'Profile',
      href: '/settings',
    },
    {
      title: 'Account',
      href: '/settings/account',
    },
    {
      title: 'Notifications',
      href: '/settings/notifications',
    },
    {
      title: 'Cars',
      href: '/settings/cars',
    },
  ],
};
