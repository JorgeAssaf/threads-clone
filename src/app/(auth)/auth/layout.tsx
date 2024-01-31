import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='relative'>
      <picture className='mx-auto size-full'>
        <source srcSet='/images/threads.webp' type='image/webp' />
        <Image
          src='/images/threads-image.webp'
          alt='thread'
          priority
          loading='eager'
          width='1715'
          height='510'
          className='absolute top-0 -z-10 mx-auto aspect-[1715/510] h-[510px] w-[1715px] object-cover'
        />
      </picture>
      {children}
    </section>
  )
}
