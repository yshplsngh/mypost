import React, { useState } from 'react';
import { Paper, Grid, Typography, TextField, Button } from "@mui/material";
import nityam_logo from "../../assests/text.png";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "20px auto",
  };

  const textFieldStyle = {
    marginBottom: 20,
  };

  const headerTextStyle = {
    color: 'green',
    textAlign: 'center',
    paddingTop: "10px",
    paddingBottom: "20px",
    fontWeight: 'bold',
  };

  const continueButtonStyle = {
    backgroundColor: '#FFD700',
    color: '#000',
    marginTop: "20px",
    padding: '10px 0',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const submitButton = () => {
    if (city.trim() === '' || pincode.trim() === '') {
      setError('Please fill in all fields.');
    } else {
      setError(null);
      navigate('/');
    }
  };

  return (
    <div className='Signup_1'>
      <Grid container justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
          <img src={nityam_logo} alt="Nityam Logo" style={{ maxWidth: "100%", paddingBottom: "10px" }} />
          <Typography variant='h4' component="div" sx={headerTextStyle}>
            Enter your City and Pincode
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
              style={textFieldStyle}
              required
              id="outlined-required"
              label="Adress, street, colony....."
              variant="outlined"
              fullWidth
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              style={textFieldStyle}
              required
              id="outlined-required"
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              style={textFieldStyle}
              required
              id="outlined-required"
              label="Pincode"
              variant="outlined"
              fullWidth
              value={pincode}
              onChange={(event) => setPincode(event.target.value)}
            />
            {error && (
              <Typography variant='body1' color='error' sx={{ textAlign: 'center', marginBottom: '10px' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              style={continueButtonStyle}
              fullWidth
              onClick={submitButton}
            >
              Continue
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
