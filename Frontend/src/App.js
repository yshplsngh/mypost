import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import Layout from './components/Layout'
import Public from './components/Public'
import PeopleLayout from './components/PeopleLayout'
import Welcome from './pages/Welcome'
import VerifyDoc from './features/auth/VerifyDoc'
import Verification from "./features/auth/Verification";
// import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<Public />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify_location' element={<Verification/>}/>
        <Route path='/signup' element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

          <Route path='/verify' element={<VerifyDoc />} />

          <Route path='people' element={<PeopleLayout />}>
            <Route index element={<Welcome />} />

            {/* here i will write code for admin portal */}
          </Route>
        </Route>
        {/* </Route> End Protected Routes */}


      </Route>
    </Routes>
  );
}

export default App;