'use client'

import { PlusIcon, X } from 'lucide-react'
import MediumZoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'


// interface ZoomContentProps {
//   img: React.ReactElement | null;
//   buttonUnzoom: React.ReactElement<HTMLButtonElement>;
//   onUnzoom: () => void;
// }


// const ZoomContent = ({ img, buttonUnzoom, onUnzoom }: ZoomContentProps) => {

//   return (
//     <div className='zoom-image'>
//       <div className='zoom-image__image'>
//         {img}
//       </div>
//       <div className='absolute top-0 right-0 z-10' onClick={onUnzoom}>
//         <X />
//       </div>
//     </div>
//   )
// }

export const ZoomImage = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <MediumZoom
      wrapElement='div'
      IconZoom={PlusIcon}
      IconUnzoom={X}
      classDialog='zoom-image'
      zoomMargin={30}
      a11yNameButtonZoom='Zoom'
      a11yNameButtonUnzoom='Unzoom'
    >
      {children}
    </MediumZoom >
  )
}
