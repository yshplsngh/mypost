import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {

  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()


  useEffect(() => {

    // incompelte
    if (effectRan.current === true || true) { // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token in persist login')
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }
      
      if (!token && persist) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])


  let content
  // persist:yes => localstorage have token
  // persist:no => localstorage have not token
  if (!persist) { // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
    console.log('loading')
    content = <PulseLoader color={"#FFF"} />
  } else if (isError) { //persist: yes, token: no
    console.log('error')
    content = (
      <p className='errmsg'>
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
export default PersistLogin