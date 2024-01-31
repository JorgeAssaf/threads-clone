'use client'

import { type ImagesFile } from '@/types/database.types'
import { cn } from '@/lib/utils'

import { Carousel, CarouselContent, CarouselItem } from './carousel'
import { ZoomImage } from './zoom-image'

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImagesFile[] | null
}

export const MediaFileCarousel = ({ images, ...props }: ImageCarouselProps) => {
  return (
    <div {...props}>
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className='grid-cols-[minmax(0,75fr),minmax(0,75fr)]'>
          {images
            ? images.map((url, i) => {
              return (
                <CarouselItem
                  key={`image-${i}+${url}`}
                  className={cn('basis-auto rounded-md py-3 ')}
                >
                  {url.type === 'video/mp4' ? (
                    <video
                      controls
                      playsInline
                      className=' aspect-[9/16] size-full max-h-[430px] rounded-md object-cover object-center align-super
                      '
                      src={url.url}
                    ></video>
                  ) : (
                    <ZoomImage>
                      {/* the next image component no used because not work with the zoom image component*/}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url.url}
                        alt='zoom image'
                        width='600px'
                        height='600px'
                        className={cn(
                          'aspect-[9/16] size-full max-h-[430px] rounded-md object-cover object-center align-super',
                        )}
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
