import { Fragment } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem } from '@/components/carousel'
import { CreateThread } from '@/components/create-thread'
import { ZoomImage } from '@/components/zoom-image'

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
                    </div>
                    <div className='flex w-full flex-col space-y-2'>
                      <h2 className=' text-primary'>
                        {post.users?.full_name}
                      </h2>
                      <p>{post.text}</p>
                      <Carousel>
                        <CarouselContent>
                          {post.images
                            ? post.images?.map((url, i) => {
                              return (
                                <CarouselItem
                                  key={i + url}
                                  className={cn(
                                    post.images?.length === 1
                                      ? ''
                                      : 'basis-1/2',
                                  )}
                                >
                                  <ZoomImage>
                                    {/* the next image component no used because not work with the zoom image component*/}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={url}
                                      alt={url}
                                      width={306}
                                      height={500}
                                      className='block aspect-auto max-h-[430px] w-auto rounded-md  object-cover'
                                    />
                                  </ZoomImage>
                                </CarouselItem>
                              )
                            })
                            : null}
                        </CarouselContent>
                      </Carousel>
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

