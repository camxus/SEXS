// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"

// ** MSAL Imports
// import { PublicClientApplication } from "@azure/msal-browser"
// import { MsalProvider } from "@azure/msal-react"

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux'

// ** Intl, CASL & ThemeColors Context
// import ability from './configs/acl/ability'
// import { AbilityContext } from './utility/context/Can'
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './utility/context/ThemeColors'
// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

import React from 'react'
import './index.css'

import reportWebVitals from './reportWebVitals'
// import App from './App'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
const container = document.getElementById('root');
const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
  // <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        {/* <AbilityContext.Provider value={ability}> */}
        <ThemeContext>
          <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
              <LazyApp />
          </BrowserRouter>
          <ToastContainer newestOnTop />
        </ThemeContext>
        {/* </AbilityContext.Provider> */}
      </Suspense>
    </Provider>,
  // </MsalProvider
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
