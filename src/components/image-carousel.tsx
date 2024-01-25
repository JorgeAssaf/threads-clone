'use client'

import { cn } from '@/lib/utils'

import { Carousel, CarouselContent, CarouselItem } from './carousel'
import { ZoomImage } from './zoom-image'

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[] | null
}

export const ImageCarousel = ({ images, ...props }: ImageCarouselProps) => {
  return (
    <div {...props}>
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent>
          {images
            ? images.map((url, i) => {
              return (
                <CarouselItem
                  key={`image-${i}+${url}`}
                  className={cn(images?.length === 1 ? '' : 'basis-[75%]', 'py-5')}
                >
                  <ZoomImage>
                    {/* the next image component no used because not work with the zoom image component*/}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={url}
                      width={306}
                      height={500}
                      className='block aspect-auto max-h-[430px] w-auto rounded-md object-cover'
                    />
                  </ZoomImage>
                </CarouselItem>
              )
            })
            : null}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
