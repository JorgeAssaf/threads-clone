import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <section className='hidden items-center space-x-2 border-b border-muted-foreground/40 pb-2 pt-4 md:flex'>
        <Skeleton className='size-9 rounded-full' />
        <Skeleton className='w-3/5 h-4' />
      </section>
      {
        Array(10).fill(0).map((_, i) => (
          <div
            key={i}
            className='grid grid-cols-[46px,minmax(0,1fr)] grid-rows-[21px,19px,maxcontent,maxcontent] items-start border-b border-muted-foreground/20  py-5'>
            <Skeleton className='size-9 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='w-1/3 h-4' />
              <Skeleton className='w-3/4 h-4' />
              <Skeleton className='w-3/4 h-4' />
              <div className="py-4">
                <Skeleton className='h-[306px] w-full' />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}