'use client'

import { type ImagesFile } from '@/types/database.types'
import { cn } from '@/lib/utils'

import { Carousel, CarouselContent, CarouselItem } from './carousel'
import { ZoomImage } from './zoom-image'

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImagesFile[] | null
}

export const ImageCarousel = ({ images, ...props }: ImageCarouselProps) => {
  return (
    <div {...props}>
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className='grid-cols-[minmax(0,75fr),minmax(0,75fr)]'>
          {images
            ? images.map((url, i) => {
              return (
                <CarouselItem
                  key={`image-${i}+${url}`}
                  className={cn(
                    images?.length === 2 && 'basis-1/2',
                    images?.length >= 3 && 'basis-1/3',
                    'basis-1/2 rounded-md py-5',
                  )}
                >
                  {url.type === 'video/mp4' ? (
                    <video
                      controls
                      width={306}
                      height={500}
                      playsInline
                      className='block aspect-video h-full max-h-[430px] w-full rounded-md object-cover'
                    >
                      <source src={url.url} type='video/mp4' />
                    </video>
                  ) : (
                    <ZoomImage>
                      {/* the next image component no used because not work with the zoom image component*/}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url.url}
                        alt='zoom image'
                        width={306}
                        loading='lazy'
                        height={500}
                        className='block aspect-auto max-h-[430px] w-full rounded-md object-cover'
                      />
                    </ZoomImage>
                  )}
                </CarouselItem>
              )
            })
            : null}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
