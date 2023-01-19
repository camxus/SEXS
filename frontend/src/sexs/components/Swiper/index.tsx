// Import Swiper styles
import 'swiper/css'

import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { Button } from 'reactstrap'
import { X } from 'react-feather'
interface ISwiperComponent extends SwiperProps{
  className?,
  style?,
  setSwiperVisible?,
  children
}
function SwiperComponent({ className, style, setSwiperVisible, children, ...rest}: ISwiperComponent) {

  return (
    <>
      <Swiper
        className={className}
        spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        style={style}
        {...rest}
      >
        {children.map(child => (
          <SwiperSlide>
            {child}
          </SwiperSlide>
        )
)}
      </Swiper>
    </>
  )
}

export default SwiperComponent