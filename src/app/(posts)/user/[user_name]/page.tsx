import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function UserPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect('/auth')
  }

  const { data: posts } = await supabase
    .from('threads')
    .select('*, users(full_name)')
    .eq('users.id', session.user?.id)
    .order('created_at', { ascending: false })
  if (!posts) {
    null
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
            <Avatar className='size-9'>
              <AvatarImage
                src={session.user?.user_metadata?.avatar_url}
                alt={session.user?.user_metadata?.full_name}
              />
              <AvatarFallback>
                {session.user?.user_metadata?.full_name
                  .split(' ')[0]
                  .charAt(0) +
                  session.user?.user_metadata?.full_name
                    .split(' ')[1]
                    .charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {posts
          ? posts.map((post) => (
            <div key={post.id} className='flex flex-col space-y-2'>
              <div className='flex items-center space-x-2'>
                <Avatar className='size-9'>
                  <AvatarImage
                    src={session.user?.user_metadata?.avatar_url}
                    alt={session.user?.user_metadata?.full_name}
                  />
                  <AvatarFallback>
                    {session.user?.user_metadata?.full_name
                      .split(' ')[0]
                      .charAt(0) +
                      session.user?.user_metadata?.full_name
                        .split(' ')[1]
                        .charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col space-y-1'>
                  <h2 className='text-lg font-semibold'>
                    {post.users?.full_name}
                  </h2>
                  <p className='text-sm font-thin'>
                    @{session.user?.user_metadata?.user_name}
                  </p>
                </div>
              </div>
              <p className='text-lg font-semibold'>{post.text}</p>
            </div>
          ))
          : null}
      </div>
    </main>
  )
}

