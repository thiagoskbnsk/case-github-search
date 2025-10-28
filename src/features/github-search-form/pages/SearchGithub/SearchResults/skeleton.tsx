import { SkeletonFilter } from './Filter'
import { SkeletonList } from './ResultsList'

export const SkeletonSearchResults = () => (
  <div className='cc-grid-template gap-6 border-t border-white/10 pt-8'>
    <SkeletonFilter />
    <SkeletonList />
  </div>
)
