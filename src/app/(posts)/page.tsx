import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreateThread } from '@/components/create-thread'
import { ImageCarousel } from '@/components/image-carousel'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: posts } = await supabase
    .from('threads')
    .select('*, users(*)')
    .order('created_at', { ascending: false })

  if (!session || !posts) {
    redirect('/auth')
  }

  return (
    <div>
      <section className='flex items-center space-x-2 border-b border-muted-foreground/40 pb-2 pt-4 '>
        <CreateThread session={session} />
      </section>

      <section>
        {posts
          ? posts.map((post) => {
            return (
              <div
                key={post.id}
                className='grid grid-cols-[46px,minmax(0,1fr)] grid-rows-[21px,19px,maxcontent,maxcontent] items-start border-b border-muted-foreground/20 py-3'
              >
                <Avatar className='size-9'>
                  <AvatarImage
                    src={post.users?.avatar_url ?? ''}
                    alt={post.users?.full_name ?? ''}
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
                <div className=''>
                  <h2 className='text-primary'>{post.users?.full_name}</h2>
                  <p>{post.text}</p>

                  <ImageCarousel images={post.images} />
                </div>
              </div>
            )
          })
          : null}
      </section>
    </div>
  )
}

