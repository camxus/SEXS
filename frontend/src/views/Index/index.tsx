import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Check, Edit2, PenTool, UserCheck, UserMinus, UserPlus, Users, X } from 'react-feather'
import { Button, Card } from 'reactstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import RadialBar from '@src/sexs/components/charts/ApexCharts/RadialBar'
import SwiperComponent from '@src/sexs/components/Swiper'
import Toggle from '@src/sexs/components/toggles/ToggleComponent'
import { handlePartnersAddRemove, queryMe, queryPartner, queryUser } from './helpers'
import AuthContext from "@src/context/auth-context"
import { formatToDateTime, getUserData, isObjEmpty } from '@src/utility/Utils'
import { getMe } from '@src/redux/User/User'
import { useDispatch, useSelector } from 'react-redux'
import { gql } from '@src/utility/hooks/useAxiosInstance'
import { SET_CAN_SEE } from '@src/sexs/graphql/partners'
import { USER_BY_ID } from '@src/sexs/graphql/users'

function Index() {
  const history = useHistory()
  const dispatch = useDispatch();

  const { username } = useParams()

  const { me, myPartners } = useSelector((state: any) => state.User)

  const [currentUser, setCurrentUser] = useState(null)
  const [partnerStatus, setPartnerStatus] = useState("")
  const [partners, setPartners] = useState([])
  
  let isMe = false
  if (username === me?.attributes?.username) isMe = true
  
  useEffect(() => {
    const asyncEffect = async() => {
      let _user
      if (username && !isMe) {
        _user = await queryUser(username)
      } else if (isMe) {
        _user = me
      }
      setCurrentUser(currentUser => _user)
      const _partners = _user.partners.map(partner => {
        return queryPartner(partner?.userId)
      })
      setPartners(_partners)
    }
    asyncEffect()
  }, [username])

  useEffect(() => {
    if (currentUser?.partners) {
      const _partner = currentUser?.partners?.find(partner => partner?.userId === currentUser._id)
      setPartnerStatus(_partner?.request?.status)
    }
  }, [currentUser])

  // const [releaseDate, setReleaseDate] = useState("")
  const [chartTarget, setChartTarget] = useState("")

  const [canSee, setCanSee]:any = useState({
    cycle: false,
    health_status: false
  })

  useEffect(() => {
    const index = partners?.findIndex(p => p?.userId === currentUser._id)
    let _partners = partners
    if (index !== -1) {
      _partners[index] = {
        ..._partners[index],
        can_see: canSee
      }
      setCurrentUser(currentUser => ({...currentUser, _partners}))
    }
    gql(SET_CAN_SEE, {partnerId: _partners[index].userId, can_see: canSee})
  }, [canSee])

  const releaseDate: any = useMemo(async() => {
    const maxReleaseDate = (partners) => { Math.max(partners.map(partner => Math.max(partner.health.history.map(entry => entry.release_date)))) }
    if (isMe) return formatToDateTime(maxReleaseDate(myPartners))

    const partners: any = await Promise.all(currentUser.partners?.map(async partner => {
        try {
            if (partner?.userId) return (await gql(USER_BY_ID, {ID: partner.userId})).data.userById
        } catch (e) {
            console.warn(e.message)
        }
    }))
    return formatToDateTime(maxReleaseDate(partners))
  }, [currentUser])

  return (
    <div className='w-100 h-100 d-flex flex-column align-items-center' style={{ minHeight: "100vh"}}>
      <div className='position-relative h-100 w-100'>
        <img className="profile-picture h-50 w-100" style={{objectFit: "cover"}} src={currentUser?.attributes?.user_images[0] ?? require("@src/assets/images/profile/user-uploads/user-10.jpg")} alt=""/>
        <div className='position-absolute w-100 h-100 overflow-scroll' style={{top: 0}}>
          <div className="position-absolute d-flex flex-column w-100 h-100 pb-4" style={{ top: "40%"}}>
            
            <Card className="m-4 shadow-none">
              <div className="profile-view-sub position-relative d-flex justify-content-between align-items-center px-4 py-1">
                <div className="d-flex" style={{gap: "0.5rem"}}>
                  <div className="rounded-circle d-flex justify-content-center align-items-center" style={{marginTop: "5px", padding: "2px", width: "15px", height: "15px", backgroundColor: (currentUser?.violations?.length === 0 && currentUser?.health.history?.length === 0) ? "limegreen" : "red"}}>
                    {(currentUser?.violations?.length === 0 && currentUser?.health.history?.length === 0) ? <Check style={{color: "white"}}/> : <X style={{color: "white"}}/>}
                  </div>
                  <div>
                    <h1>{(currentUser?.attributes.name.first_name !== "") ? currentUser?.attributes.name.first_name :  "No Name"}</h1>
                    <h6>{currentUser?.attributes.age ?? "No Age"}</h6>
                  </div>
                </div>
                  
                {
                  isMe ?
                    <Button color="white" className="rounded-circle shadow d-flex justify-content-center align-items-center p-0" style={{width: "50px", height: "50px", transition: "all 0.2s ease-in-out"}}>
                      <Edit2/>
                    </Button>
                  :
                    <Button color={partnerStatus !== "accepted" ? "white" : "primary"} onClick={() => handlePartnersAddRemove(dispatch, currentUser._id, partnerStatus ? "remove" : "add", setPartnerStatus)} className="rounded-circle shadow d-flex justify-content-center align-items-center p-0" style={{width: "50px", height: "50px", transition: "all 0.2s ease-in-out"}}>
                    {partnerStatus === "accepted" ? <UserCheck/> : partnerStatus === "pending" ? <Users/> : <UserPlus/>}
                  </Button>
                }
              </div>
            </Card>
            <div className="overflow-scroll d-flex flex-column align-items-center w-100 px-4 py-2" style={{flex: 1, scrollSnapType: "y mandatory"}}>
              <Card className="w-100 shadow-none">
                {!isMe &&
                  <div className="canSee w-100 p-2">
                    <h3 className="canSee__title">Can See</h3>
                    <div className="d-flex flex-column justify-content-center my-1">
                      {
                        currentUser?.attributes.sex === "female" &&
                        <>
                          <div className="canSee__option d-flex justify-content-between align-items-center">
                            <p className="m-0">Period</p>
                            <Toggle
                              checked={currentUser?.can_see?.cycle ?? false}
                              size={24}
                              // disabled={this.state.disabled}
                              onChange={(e) => setCanSee(option => ({...canSee, cycle: (e.target.value === "on") ? true : false}))}
                              offstyle="btn-transparent"
                              onstyle="btn-primary"
                            />
                          </div>
                          <hr/>
                        </>
                      }
                      <div className="canSee__option d-flex justify-content-between align-items-center">
                        <p className="m-0">Health Status</p>
                        <Toggle
                          checked={currentUser?.can_see?.health_status ?? false}
                          size={24}
                          // disabled={this.state.disabled}
                          onChange={(e) => setCanSee(option => ({...canSee, health_status: (e.target.value === "on") ? true : false}))}
                          offstyle="btn-transparent"
                          onstyle="btn-primary"
                        />
                      </div>
                    </div>
                </div>
                }
              </Card>
              {(currentUser?.violations?.length > 0 || currentUser?.health.history?.length > 0)&&
                <Card className="w-100 shadow-none">
                  <div className="user-info d-flex flex-column justify-content-center">
                      <div className="user-details p-3">
                        <div className="user-details__reports">
                          {currentUser?.violations?.length > 0 &&
                            // <p>{isMe ? "You" : "This User"} has not been reported.</p> 
                            // : 
                            <p>{isMe ? "You" : "This User"} has been reported by {currentUser?.violations?.length === 1 ? "1 person" : `${currentUser?.violations?.length} people`}.</p>
                          }
                        </div>
                        <div className="user-details__std">
                          {currentUser?.health.history?.length > 0 &&
                            // <p>{isMe ? "You" : "This User"} has not been reported.</p> 
                            // : 
                            <>
                              <p>{isMe ? "You" : "This User"} has recently been in contact with someone who has contracted an STD.</p>
                              <p>{currentUser?.pronouns[0] === "he" && "He is"} {currentUser?.pronouns[0] === "she" && "She is"} {currentUser?.pronouns[0] === "they" && "They are"} estimated to test negative by {releaseDate}</p>
                            </>
                          }
                        </div>
                      </div>
                  </div>
                </Card>
              }
              {
                currentUser?.attributes.sex === "female" &&
                  <Card className="shadow-none">
                    <div onClick={() => setChartTarget(chartTarget => (chartTarget === "period") ? "ovulation" : "period")} className="period-clock d-flex justify-content-center align-items-center p-3">
                      <RadialBar {...{title: (chartTarget === "period") ? "Days Until Period" : "Days Until Ovulation", value: 1, percentage: 75}}/>
                    </div>
                  </Card>
              }
              <div className='w-100'>
                <div className="d-flex overflow-scroll" style={{ scrollSnapType: "x mandatory" }}>
                  {
                    (isMe && myPartners?.length !== 0) && myPartners.map(partner => 
                      <Link to={`/${partner.attributes.username}`}>
                        <Card className="mx-2 p-1 shadow-none" style={{minWidth: "min-content"}} >
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="rounded-circle overflow-hidden" style={{ width: "100px", height: "100px"}}>
                              <img className="profile-picture h-100 w-100" style={{objectFit: "cover"}} src={partner?.attributes. user_images?.[0] ?? require("@src/assets/images/profile/user-uploads/user-10.jpg")}/>
                            </div>
                            <h5 className="my-1">{partner?.attributes.name.first_name ?? "No Name"}</h5>
                          </div>
                        </Card>
                      </Link>
                    )
                  }
                </div>
              </div>
              {!isMe && currentUser?.partners?.find(partner => partner?.userId === currentUser._id) && <Button color="white" className="hide bg-white shadow" >Hide {currentUser.name}</Button>}
            </div>
          </div>
        </div>
      </div>
      <div className="position-fixed d-flex justify-content-center w-100" style={{flex: 1, bottom: 0}}>
        <Button color="white" className="report position-absolute bg-white shadow" style={{bottom: "1rem"}} onClick={() => history.push("/report") }>Something Happened</Button>
      </div>
    </div>
  )
}

export default Index