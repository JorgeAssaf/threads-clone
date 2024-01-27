'use client'

import Link from 'next/link'

import { MenuIcon, ThreadsLogo } from '../icons'
import { Button } from '../ui/button'
import { MainNav } from './main-nav'

export interface User {
  user: string
}

export const SiteHeader = ({ user }: User) => {
  return (
    <header className='sticky top-0 z-40 w-full bg-[#101010]/85 backdrop-blur-xl'>
      <div className='mx-auto grid h-[3.75rem] w-[63%] grid-cols-[1fr,50vw,1fr]  grid-rows-1 items-center md:h-[4.625rem] md:grid-cols-[1fr,max-content,1fr]'>
        <div className='col-start-2 mx-auto md:col-start-1 md:mx-0'>
          <Link href='/'>
            <ThreadsLogo className='transition-transform duration-200 hover:scale-110' />
          </Link>
        </div>

        <div className='col-start-1 row-start-1 md:col-start-2 md:row-start-[0]'>
          <MainNav user={user} className='hidden md:grid' />
        </div>

        <div className='flex justify-end'>
          <Button
            variant={'ghost'}
            className='fill-muted-foreground/50 transition-colors duration-75 hover:fill-foreground'
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
