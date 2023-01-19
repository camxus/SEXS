import React, { useEffect, useState } from 'react'
import { ArrowLeft, Check, UserCheck, UserMinus, UserPlus, X } from 'react-feather'
import { Button, Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import RadialBar from '@src/sexs/components/charts/ApexCharts/RadialBar'
import SwiperComponent from '@src/sexs/components/Swiper'
import Toggle from '@src/sexs/components/toggles/ToggleComponent'
import CompactCalendar from './_CompactCalendar'
import FullCalendar from './FullCalendar'

import UsersList from "@src/sexs/components/users/users-list"
import { useSelector } from 'react-redux'

function Index() {
  const history = useHistory()
  const { me } = useSelector((state: any) => state.User)
  const { myPartners } = useSelector((state: any) => state.User)

  const [chartTarget, setChartTarget] = useState("")
  const [showFullCalendar, setShowFullCalendar] = useState(false)

  const userList = myPartners.map(partner => ({
    ...partner,
    firstName: partner.attributes.name.first_name,
    image: partner.attributes.user_images[0],
    id: partner._id
  }))

  return (
    <div className='w-100 d-flex flex-column align-items-center' style={{ minHeight: "100vh"}}>
      <div className="position-relative d-flex flex-column w-100 py-4 px-4">
        <div className="avatar__container cursor-pointer position-relative w-auto d-flex m-1 justify-content-end align-items-center" 
          style={{gap: "0.5rem"}}
          onClick={() => { history.push(`/${me.attributes?.username}`) }}
        >
          <img className="rounded-circle" width={32} height={32} src={me.attributes?.user_images[0]} alt="" style={{objectFit: "cover"}}/>
          <h1 className='fw-bold m-0'>{me.attributes?.name.first_name}</h1>
        </div>
        <Card className="calendar__container w-100 shadow-none">
          <div className="calendar d-flex justify-content-center align-items-center" onClick={() => setShowFullCalendar(true)}><CompactCalendar/></div>
        </Card>
        {
          myPartners.find(partner => partner.health.tested === false) &&
            <Card className="w-100 shadow-none bg-primary">
              <p className="m-3 text-white">One of your partners has tested positive for an STD. Please submit a negative proof to re-verify your account.</p>
            </Card>
        }
        {/* <Card className=" shadow-none"> */}
          <div onClick={() => setChartTarget(chartTarget => (chartTarget === "period") ? "ovulation" : "period")} className="period-clock d-flex justify-content-center align-items-center p-3">
            <RadialBar {...{title: (chartTarget === "period") ? "Days Until Period" : "Days Until Ovulation", value: 1, percentage: 75}}/>
          </div>
        {/* </Card> */}
        {me.violations?.length > 0 &&
          <Card className="w-100 shadow-none">
            <p className="m-0 p-3">You have been reported by {me.violations.length === 1 ? "1 person" : `${me.violations.length} people`}.</p>
          </Card>
        }
        <Button color="white" className="hide bg-white shadow-none w-100 mb-2" >Add Partner</Button>
        <UsersList {...{users: userList, onClick: (user) => history.push(`/${user.attributes?.username}`)}}/>
      </div>
      <div className="position-fixed d-flex justify-content-center w-100" style={{flex: 1, bottom: 0}}>
        <Button color="white" className="report position-absolute shadow-none bg-white shadow" style={{bottom: "1rem"}} onClick={() => history.push("/report") }>Something Happened</Button>
      </div>
      <div 
        className="position-fixed d-flex justify-content-center align-items-center h-100 w-100 bg-white" 
        style={{zIndex: 1000, transition: "all 0.3s ease-in-out", opacity: showFullCalendar ? "1" : "0", pointerEvents: showFullCalendar ? "all" : "none" }}
      >
        <ArrowLeft className="position-absolute" style={{top: "2rem", left: "2rem"}} onClick={() => setShowFullCalendar(false)}/>
        <FullCalendar/>
      </div>
    </div>
  )
}

export default Index