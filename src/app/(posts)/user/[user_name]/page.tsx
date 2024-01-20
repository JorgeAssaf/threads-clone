import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'

export default async function UserPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect('/auth')
  }
  return (
    <main>
      <div className='mx-auto w-[624px] px-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h2 className='text-xl font-semibold'>
              {session.user?.user_metadata?.full_name}
            </h2>
            <p className='text-sm font-thin'>
              @{session.user?.user_metadata?.user_name}
            </p>
          </div>
          <div>
            <Image
              src={session.user?.user_metadata?.avatar_url}
              alt='avatar'
              width={100}
              height={100}
              className='rounded-full'
            />
          </div>
        </div>
      </div>
    </main>
  )
}

