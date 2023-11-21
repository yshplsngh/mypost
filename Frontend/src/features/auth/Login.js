import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import { Paper, Grid, Typography, TextField, Button, Divider } from "@mui/material";
// import { auth, provider } from "../Config/firebase";
// import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import usePersist from '../../hooks/usePersist';

export default function Login() {
  const userRef = useRef()
  const errRef = useRef()
  // const [userDisplayName, setUserDisplayName] = useState(""); // State for user's display name

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading, isSuccess }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "offscreen"

  useEffect(() => {
    if (isSuccess) {
      setEmail('')
      setPassword('')
      navigate('/people')
      console.log("redirect to people page from login")
    }
  }, [isSuccess, navigate])

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "20px auto",
  };

  const textFieldStyle = {
    marginBottom: 20,
  };

  const loginButtonStyle = {
    backgroundColor: '#FFD700', // Yellow
    color: '#000', // Black text
    marginTop: 20,
    padding: '10px 0',
  };

  // const googleButtonStyle = {
  //   backgroundColor: '#D3D3D3', // Dark Green
  //   color: '#000', // Black text
  //   // marginTop:,
  //   padding: '10px 0',
  // };

  const headerTextStyle = {
    color: 'green',
    textAlign: 'center',
    padding: "20px"
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      console.log(accessToken)
      dispatch(setCredentials({ accessToken }))
      localStorage.setItem("persist",true)
    } catch (err) {
      console.log(err)
      if (!err.status) {
        setErrMsg('No Server Response');
      }
      else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  // const astyle = {
  //   textDecoration: "none",
  // };


  // Backend code for signIn with Google
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     if (result.user) {
  //       const displayName = result.user.displayName;
  //       setUserDisplayName(displayName || 'User');
  //       navigate('/verify');
  //     }
  //   } catch (error) {
  //     console.error('Google sign-in error:', error);
  //   }
  // }

  if (isLoading) return <PulseLoader color={"#122738"} />

  const content = (
    <>
      <div className='Login'>
        <Grid container justifyContent="center">
          <Paper elevation={10} style={paperStyle}>
            <Typography variant='h4' component="div" sx={headerTextStyle}>
              <b>Sign In</b>
            </Typography>
            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="contained-required">Email:</label>
              <TextField
                style={textFieldStyle}
                required
                id="contained-required"
                // label="E-mail"
                variant="outlined"
                fullWidth
                value={email}
                ref={userRef}
                onChange={handleUserInput}
              />
              <label htmlFor="outlined-password">Password:</label>
              <TextField
                style={textFieldStyle}
                required
                id="outlined-password"
                // label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={handlePwdInput}
              />
              {/* <a style={astyle} href=''>
                Forgot password?
              </a> */}
              <Button
                type="submit"
                variant="contained"
                style={loginButtonStyle}
                fullWidth
              >
                Log In
              </Button>
              <Divider style={{ margin: '25px 0' }} />
              {/* <Button
              type="submit"
              variant="contained"
              style={googleButtonStyle}
              fullWidth
              onClick={signInWithGoogle}
            >
              <FcGoogle style={{ fontSize: '30px', marginRight: '10px' }} />
              Continue with Google
            </Button> */}
            </form>
            <Typography variant='h7' component="div" sx={{ paddingTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontFamily: "Times New Roman, serif" }} >
              New to Nityamneeds? <Link to="/signup">SignUp</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </>
  )
  return content
}
