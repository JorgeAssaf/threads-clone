import { Home, Likes, Post, Search } from '@/components/icons'

export const siteConfig = {
  title: 'Threads-Clone',
  description:
    'This is a threads clone built with React, Next.js, and Tailwind CSS.',
  keywords: ['threads', 'clone', 'react', 'nextjs', 'tailwindcss'],
}
export const links = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/search',
    label: 'Search',
    icon: Search,
  },
  {
    href: '/create',
    label: 'Create',
    icon: Post,
  },

  {
    href: '/likes',
    label: 'Likes',
    icon: Likes,
  },
]

export type SiteConfig = typeof siteConfig
