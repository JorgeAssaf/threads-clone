'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from '@/config/site'
import { cn } from '@/lib/utils'

import { Profile } from '../icons'

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  user: string
}

export const MainNav = ({ user, className }: MainNavProps) => {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'mx-auto grid grid-cols-[repeat(5,20%)] items-center ',
        className,
      )}
    >
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
  )
}
