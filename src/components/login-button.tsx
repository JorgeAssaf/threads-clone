'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChevronRight } from 'lucide-react'

import { Github } from './icons'
import { Button } from './ui/button'

export function LoginButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  return (
    <Button
      onClick={handleSignIn}
      type='button'
      variant={'ghost'}
      className='rounded-xl border border-muted-foreground/20 py-10'
    >
      <Github className='mr-4 size-10' />
      Iniciar sesión con Github
      <ChevronRight className='ml-4 text-muted-foreground/30' />
    </Button>
  )
}
