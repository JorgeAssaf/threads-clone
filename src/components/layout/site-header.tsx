'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from '@/config/site'
import { cn } from '@/lib/utils'

import { MenuIcon, Profile, ThreadsLogo } from '../icons'

export interface User {
  user: string
}

export const SiteHeader = ({ user }: User) => {
  const pathname = usePathname()
  return (
    <header className='sticky top-0 z-40 w-full bg-background backdrop-blur-xl'>
      <div className='container flex h-[4.625rem] items-center justify-center md:grid md:grid-cols-[1fr,max-content,1fr]'>
        <div>
          <Link href='/'>
            <ThreadsLogo className='transition-transform duration-200 hover:scale-110' />
          </Link>
        </div>
        <nav className='hidden text-center md:grid md:grid-cols-[repeat(5,20%)]'>
          {links.map((link) => (
            <Link
              href={link.href || '/'}
              key={link.href}
              role='link'
              className={cn(
                'mx-[2px] my-[4px] px-8 py-5  text-muted-foreground ',
                pathname == link.href && 'fill-foreground text-foreground',
              )}
            >
              <link.icon />
            </Link>
          ))}



          <Link
            href={`/user/@${user}`}
            role='link'
            className={cn(
              'mx-[2px] my-[4px] px-8 py-5  text-muted-foreground ',
              pathname == `/user/@${user}` && 'fill-foreground text-foreground',
            )}
          >
            <Profile />
          </Link>
        </nav>

        <div className='hidden justify-end md:flex'>
          <Link href='/posts' role='link'>
            <MenuIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
