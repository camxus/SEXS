import SwiperComponent from '@src/sexs/components/Swiper'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function EditUser() {
    const { me } = useSelector((state: any) => state.User)

    const [showGallery, setShowGallery] = useState(false)

    return (
            <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="rounded" style={{width: "90vw", height: "90vw"}}>
                    <SwiperComponent onClick={() => setShowGallery(true)}>
                        {me.attributes.user_images.map(image => <img src={image} alt =""/>)}
                    </SwiperComponent>
                </div>
            </div>
    )
}

export default EditUser