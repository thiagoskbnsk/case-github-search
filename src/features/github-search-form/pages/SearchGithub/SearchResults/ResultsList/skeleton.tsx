export const SkeletonList = () => {
  return (
    <div className='grid w-full gap-2'>
      {Array.from({ length: 6 }).map((_, index) => {
        const opacity = Math.max(1 - index * 0.21, 0)

        return (
          <div key={index} className='cc-card rounded-md' style={{ opacity }}>
            <div className='animate-pulse'>
              {/* Header */}
              <div className='flex items-center justify-between border-b border-white/10 p-4'>
                <div className='flex max-w-6/12 items-center gap-1'>
                  <div className='h-4 w-4 shrink-0 rounded-full bg-white/10' />
                  <div className='h-4 w-20 rounded bg-white/10' />
                  <div className='h-4 w-1 rounded bg-white/10' />
                  <div className='h-4 w-24 rounded bg-white/10' />
                </div>
                <div className='flex max-w-6/12 items-start gap-x-2'>
                  <div className='h-6 w-16 rounded-md bg-white/10' />
                  <div className='h-6 w-12 rounded-md bg-white/10' />
                  <div className='h-6 w-6 rounded-md bg-white/10' />
                </div>
              </div>

              {/* Description */}
              <div className='p-4'>
                <div className='h-4 w-full rounded bg-white/10' />
                <div className='mt-2 h-4 w-3/4 rounded bg-white/10' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
