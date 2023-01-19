import React, { useEffect, useState } from 'react'
import { Camera } from 'react-feather'
import { Button } from 'reactstrap'

function UserImage(props) {
    const { setUserData } = props
    // const [openFileSelector, { filesContent, loading }] = useFilePicker({
    //     accept: "image/*",
    // })
    

    // useEffect(() => {
    //     console.log(filesContent)
    // }, [filesContent])

    const [image, setImage] = useState(null)

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            resolve(reader.result)
        }
    })

    const pickImage = async (input) => {
        // const res = await fetch(input)
        // const blob = await res.blob()
        const bs4 = await fileToDataUri(input)
        if (input) {
            setImage(bs4)
            setUserData(user => ({...user, attributes: {...user.attributes,  user_images: [bs4]}}))
        }
    }

    return (
        <div className="d-flex h-100 w-100 flex-column">
            <h1 className="h-100 d-flex justify-content-center align-items-center mb-5">Please upload a User Image</h1>
            <div className="w-100 h-100 d-flex align-items-center my-5" style={{justifyContent: "center"}} onClick={() => {}}>
                <div className="rounded-circle position-relative bg-white overflow-hidden d-flex justify-content-center align-items-center" style={{height: 100, width: 100}}>
                    <input type="file" className='position-absolute w-100 h-100 opacity-0 cursor-pointer' accept='images/*' onChange={e => pickImage(e.target.files[0])}/>
                    {image ? 
                        <img 
                            className="h-100 bg-green w-100" 
                            // onClick={() => openFileSelector()}
                            src={image ?? ""} 
                            style={{objectFit: "cover"}} 
                            alt="" 
                        />
                    :
                    <>
                        <Camera color="lightgrey"/>   
                    </>
                    }
                </div>
            </div>
            <Button color="primary" onClick={() => props.nextStep()}>Next</Button>
        </div>
    )
}

export default UserImage