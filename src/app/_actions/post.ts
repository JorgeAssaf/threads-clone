'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'

export async function addPost(formdata: FormData, images: string[] | null) {
  const cookieStore = cookies()
  const body = formdata.get('body')

  if (!body) return

  const supabase = createServerActionClient<Partial<Database>>({
    cookies: () => cookieStore,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  await supabase.from('threads').insert({
    text: body,
    user_id: user?.id,
    images: images,
  })

  revalidatePath('/')
}
