import React from "react";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

import {
  CitySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import {
  Paper,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import bg_signUp from "../../assests/bg-signUp.jpg"; // Fixed typo in assets
import bg_back from "../../assests/bg_back.jpg"; // Fixed typo in assets
import { MuiTelInput } from "mui-tel-input";
import PulseLoader from "react-spinners/PulseLoader";

// const USER_REGEX = /^[A-z]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const Signup = () => {
//   const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
    const countryid = 101
  // const errRef = useRef()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [postalCost, setPostalCost] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [state, setState]=useState("");
  // const [password, setPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useState(""); // State for user's display name
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setPassword("");
      setEmail("");
      setAddress("");
      setPhoneNumber("");
      setPostalCost("");
      setCity("");
      navigate("/login");
      console.log("redirect to login page");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onPhoneNumberChanged = (val) => setPhoneNumber(val);
  const onPostalCostChanged = (e) => setPostalCost(e.target.value);
  // const onPostalCostChanged = (newValue) => setPostalCost(newValue)
//   const onCityChanged = (e) => setCity(e.target.value);

  // here we define vaidation and use some regex
  // const canSave = [name.length !== 0, password.length !== 0, email.length !== 0, address.length !== 0, phoneNumber.length !== 0, postalCost.length !== 0, city.length !== 0].every(Boolean) && !isLoading

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, address, phoneNumber, postalCost, city]);

  const errClass = errMsg ? "errmsg" : "offscreen";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        name,
        password,
        email,
        phoneNumber,
        city,
        address,
        postalCost,
      }).unwrap();
      console.log("done");
    } catch (err) {
      console.log(err);
      if (!err.status) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };


  const googleButtonStyle = {
    backgroundColor: "#D3D3D3", // Dark Green
    color: "#000", // Black text
    padding: "10px 0",
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const displayName = result.user.displayName;
        setUserDisplayName(displayName || "User");
        navigate("/verify_location");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const [value, setValue] = useState("");

  if (isLoading) return <PulseLoader color={"#122738"} />;

  const content = (
    <>
      <div
        style={{
          backgroundImage: `url(${bg_back})`,
          backgroundSize: "cover",
          minHeight: "100vh", // Set to minHeight for responsiveness
          color: "#f5f5f5",
          display: "flex",
          justifyContent: "center", // Center content horizontally
          alignItems: "center", // Center content vertically
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px", // Adjust this value based on your design
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 128, 0, 0.4), rgba(0, 128, 0, 0.7)), url(${bg_signUp})`,
                  backgroundSize: "cover",
                  minHeight: "97vh", // Adjust the height as needed
                  display: "flex",
                  borderRadius: "10px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#fff",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                }}
              >
                <Typography
                  variant="h3"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Register Now
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Paper
                sx={{
                  padding: "20px",
                  backgroundColor: "#f7f7f7",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p className={errClass} aria-live="assertive">
                  {errMsg}
                </p>

                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  Register now and explore the communities.
                </Typography>
                <form onSubmit={handleSubmit}>
                  {/* <p className={errClass}>{errMsg}</p> */}
                  {/* <p className={errClass}>{error?.data?.message}</p> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {/* First Name, City, Address, Postal code fields */}
                      <TextField
                        id="first-name"
                        required
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={name}
                        onChange={onNameChanged}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* <TextField
                        id="city"
                        required
                        label="City"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={city}
                        onChange={onCityChanged}
                      /> */}
                        <StateSelect
                        countryid={101}
                        onChange={(e) => {{setstateid(e.id)} {setState(e.name)}}}

                         placeHolder="Select State"
                        />
                     


                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* <TextField
                        id="city"
                        required
                        label="City"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={city}
                        onChange={onCityChanged}
                      /> */}

                      <CitySelect
                        countryid={countryid}
                        stateid={stateid}
                        onChange={(e)=>{setCity(e.name)}}
                        value={city}
                        placeHolder="Select City"
                      />


                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address"
                        required
                        label="Address, Colony, House No."
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={address}
                        onChange={onAddressChanged}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="pincode"
                        required
                        label="Postal code"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={postalCost}
                        onChange={onPostalCostChanged}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}> */}
                    {/* Last Name, E-mail, Set new password, Phone No. fields */}
                    {/* <TextField
                                            id="last-name"
                                            required
                                            label="Last Name"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: "20px" }}
                                        />
                                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="email"
                        required
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={email}
                        onChange={onEmailChanged}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="password"
                        required
                        label="Set new password"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                        value={password}
                        onChange={onPasswordChanged}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MuiTelInput
                        required
                        value={phoneNumber}
                        label="Phone No."
                        onChange={onPhoneNumberChanged}
                        fullWidth
                        sx={{ marginBottom: "20px" }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      alignSelf: "center",
                      backgroundColor: "green",
                      color: "white",
                      width: "40%",
                      padding: "10px 0",
                      marginBottom: "20px",
                    }}
                    // disabled={!canSave}
                  >
                    Register
                  </Button>
                  <Divider
                    sx={{
                      margin: "20px 0",
                      backgroundColor: "rgba(189, 195, 199)",
                    }}
                  />
                </form>
                <Button
                  type="submit"
                  variant="contained"
                  style={googleButtonStyle}
                  sx={{ width: "100%" }}
                  fullWidth
                  onClick={signInWithGoogle}
                >
                  <FcGoogle style={{ fontSize: "30px", marginRight: "10px" }} />
                  Continue with Google
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <h6>state</h6>
        
        <h6>City</h6>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select City"
        />
        <h6>Language</h6>
        <LanguageSelect
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select Language"
        />
      </div>
    </>
  );
  return content;
};

export default Signup;
