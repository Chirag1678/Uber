import { Route, Routes } from "react-router-dom"
import Start from "./pages/Start"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainSignUp from "./pages/CaptainSignUp"
import CaptainLogin from "./pages/CaptainLogin"
import Home from "./pages/Home"
import UserAuth from "./pages/UserAuth"
import UserLogout from "./pages/UserLogout"
import CaptainLogout from "./pages/CaptainLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainAuth from "./pages/CaptainAuth"
import Riding from "./pages/Riding"
import CaptainRiding from "./pages/CaptainRiding"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignUp/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/riding" element={<Riding/>}/>
        <Route path="/captain-riding" element={<CaptainRiding/>}/>
        <Route path="/home" element={
          <UserAuth>
            <Home/>
          </UserAuth>
        }/>
        <Route path="/logout" element={
          <UserAuth>
            <UserLogout/>
          </UserAuth>
        }/>
        <Route path="/captain-logout" element={
          <CaptainAuth>
            <CaptainLogout/>
          </CaptainAuth>
        }/>
        <Route path="/captain-home" element={
          <CaptainAuth>
            <CaptainHome/>
          </CaptainAuth>
        }/>
      </Routes>
    </div>
  )
}

export default App
