import { type Session } from '@supabase/auth-helpers-nextjs'

import { type Database } from '@/types/database.types'

import { MediaFileCarousel } from './media-file-carousel'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { notFound } from 'next/navigation'

type PostEntity = Database['public']['Tables']['threads']['Row']
type UserEntity = Database['public']['Tables']['users']['Row'] | null
export interface PostCardProps {
  post: PostEntity & { users: UserEntity }
  session: Session
}

export const PostCard = ({ post, session }: PostCardProps) => {
  if (!post) {
    return notFound()
  }
  return (
    <div className='grid grid-cols-[46px,minmax(0,1fr)] grid-rows-[21px,19px,maxcontent,maxcontent] items-start border-b border-muted-foreground/20 py-3'>
      <Avatar className='size-9'>
        <AvatarImage
          src={post.users?.avatar_url ?? ''}
          alt={post.users?.full_name ?? ''}
        />
        <AvatarFallback>
          {session.user?.user_metadata?.full_name.split(' ')[0].charAt(0) +
            session.user?.user_metadata?.full_name.split(' ')[1].charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className='text-primary'>{post.users?.user_name}</h2>
        <p>{post.text}</p>
        <MediaFileCarousel images={post.images} />
      </div>
    </div>
  )
}
