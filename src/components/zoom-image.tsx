'use client'

import MediumZoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

export const ZoomImage = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <MediumZoom
      wrapElement='div'
      classDialog='zoom-image'
      zoomMargin={30}
      a11yNameButtonZoom='Zoom'
      a11yNameButtonUnzoom='Unzoom'
    >
      {children}
    </MediumZoom>
  )
}
