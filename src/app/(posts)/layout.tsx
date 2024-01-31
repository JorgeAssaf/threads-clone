import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { SiteHeader } from '@/components/layout/site-header'

export default async function PostsLayout({
  children,
}: React.PropsWithChildren) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return redirect('/auth')
  }
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader user={session.user?.user_metadata?.user_name} />
      <main className='container max-w-[624px] flex-1 px-6'>{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}

