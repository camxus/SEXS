// ** Logo
// import logo from '@src/assets/images/logo/porsche-text.png'

const SpinnerComponent = ({className}) => {
  return (
    <div className={`fallback-spinner app-loader ${className}`}>
      <img className='fallback-logo' src={""} alt='logo' width={"15%"}/>
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
