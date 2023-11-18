import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import Layout from './components/Layout'
import Public from './components/Public'
import PeopleLayout from './components/PeopleLayout'
import Welcome from './components/Welcome'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<Public />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>

        <Route path='people' element={<PeopleLayout />}>
          <Route index element={<Welcome />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;