import { notFound } from 'next/navigation'

import { type Database } from '@/types/database.types'

import { MediaFileCarousel } from './media-file-carousel'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type PostEntity = Pick<
  Database['public']['Tables']['threads']['Row'],
  'id' | 'text' | 'images' | 'created_at'
> | null
type UserEntity = Pick<
  Database['public']['Tables']['users']['Row'],
  'full_name' | 'user_name' | 'avatar_url'
> | null
export interface PostCardProps {
  post: PostEntity & { users: UserEntity }
}

export const PostCard = ({ post }: PostCardProps) => {
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
          {post.users?.user_name?.charAt(0).toUpperCase()}
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
