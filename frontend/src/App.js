import { Switch, Route, Redirect, BrowserRouter, useHistory } from "react-router-dom"
import Index from "./views/Index"
import Home from "./views/Home"
import Report from "./views/Report"
import STD from "./views/Report/STDReportWizard"
import Incident from "./views/Report/IncidentReportWizard"
import AuthContext from './context/auth-context';
import { useState } from "react"
import AuthPage from "./views/views/Auth/Auth";
import { getUserData, isObjEmpty } from "./utility/Utils";
import jwt_decode from "jwt-decode"
import { useSelector, useDispatch } from "react-redux"
import { getMe } from '@src/redux/User/User'
import Settings from "./views/Settings"
import Settings_HiddenUsers from "./views/Settings/HiddenUsers"
import LoginV1 from "./views/views/Login"
import SignUp from "./views/views/Login/SignUp"
import SubmitTest from "./views/SubmitTest"

function App() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  const [authState, setAuthState] = useState(null)

  const { me } = useSelector((state) => state.User)

  const login = (token, userId, tokenExpiration) => {    
    const userData = {
      userId: userId,
      token: token
    }
    localStorage.setItem("userData", JSON.stringify(userData))
    setToken(token)
    setUserId(userId)
    history.push("/")
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.clear()
    window.location.reload()
  }

  let tokenIsValid = false
  try {
    tokenIsValid = jwt_decode(getUserData()?.token).exp * 1000 > new Date().getTime()
    if (tokenIsValid === false) {
      throw new Error("Invalid token")
    }
    if (isObjEmpty(me)) {
      dispatch(getMe())
    }
  } catch (e) {
    return <AuthContext.Provider
              value={{
                token: token,
                userId: userId,
                login: login,
                logout: logout
              }}
            >
      {/* <AuthPage/> */}
      {authState?.type === "signUp" ?
        <SignUp /> 
      :
        <LoginV1 {...{setAuthState}}/>}
    </AuthContext.Provider>
  }

  return (
    <>
        <AuthContext.Provider
              value={{
                token: token,
                userId: userId,
                login: login,
                logout: logout
              }}
            >
          <Switch>
            {/* {tokenIsValid && <Redirect from="/auth" to="/" exact />}
            <Route path="/auth" exact component={AuthPage}/>
            {!tokenIsValid && <Redirect to="/auth" exact component={AuthPage}/>} */}
            <Route path="/" exact component={Home} />
            <Route path="/submit-test" exact component={SubmitTest} />
            <Route path="/report" exact component={Report} />
            <Route path="/report/std-report" exact component={STD} />
            <Route path="/report/incident-report" exact component={Incident} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/settings/hidden" exact component={Settings_HiddenUsers} />
            
            <Route path="/:username" exact component={Index} />
          </Switch>
        </AuthContext.Provider>
    </>
  );
}

export default App;
