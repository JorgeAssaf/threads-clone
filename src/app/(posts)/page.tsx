import { Fragment } from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { CreateThread } from '@/components/create-thread'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: posts } = await supabase.from('threads').select('*, users(*)')
  if (!session || !posts) {
    redirect('/auth')
  }
  return (
    <div className='mx-auto w-[624px] px-6'>
      <div>
        <section className='flex items-center space-x-2 border-b border-muted-foreground/40 pb-2 pt-4'>
          <CreateThread session={session} />
        </section>

        <section className='my-4 flex flex-col space-x-2'>
          <div className='grid grid-cols-[36px,100%] items-start gap-4 '>
            {posts
              ? posts.map((post) => {
                return (
                  <Fragment key={post.id}>
                    <div className='flex justify-start space-x-2 '>
                      <Image
                        src={post.users?.avatar_url ?? '/avatar.png'}
                        alt='avatar'
                        width={36}
                        height={36}
                        className='rounded-full'
                      />
                    </div>
                    <div className='flex w-full flex-col space-y-2'>
                      <h2 className=' text-primary'>
                        {post.users?.full_name}
                      </h2>
                      <p>{post.text}</p>
                    </div>
                  </Fragment>
                )
              })
              : null}
          </div>
        </section>
      </div>
    </div>
  )
}

