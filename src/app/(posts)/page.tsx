import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'
import { CreateThread } from '@/components/create-thread'
import { PostCard } from '@/components/post-card'

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
      <section className='flex space-x-2 border-b border-muted-foreground/40 pb-2 pt-4 '>
        <CreateThread session={session} />
      </section>

      <section>
        {posts.map((post) => (
          <PostCard key={post.id} session={session} post={post} />
        ))}
      </section>
    </div>
  )
}

