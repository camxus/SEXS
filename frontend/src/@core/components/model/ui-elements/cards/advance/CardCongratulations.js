import { Award, User } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = ({accounts}) => {
  const firstName = accounts[0].name.split(" ")[0]
  const lastName = accounts[0].name.split(" ").pop()
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<User size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Hallo {firstName}!</h1>
          <CardText className='m-auto w-75'>
            Schön dich wieder zu sehen!
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
