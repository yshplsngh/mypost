import {React,useState} from 'react'
import DashHeader from "./DashHeader";
import DashFooter from './DashFooter';
import bg from '../assests/bg.jpg';
import ExploreIcon from '@mui/icons-material/Explore';
import {
  Box,
  FormControl,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';
const Public = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchButtonClick = () => {
    // Implement your search logic here if needed
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <>
     <div><DashHeader /></div>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          height: '100vh',
          paddingTop:"12vh",
          paddingLeft:"8vh",
        }}
      >
        
        <Typography
  variant="h2"
  component="div"
  sx={{
    width: '70vh',
    paddingTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontFamily: 'Pacifico, cursive', // Change the font to a more attractive one
    paddingBottom: '20px',
    position: 'relative', // Use relative positioning for the underline
  }}
>
  <ExploreIcon sx={{ fontSize: '3rem', marginRight: '10px' }} /> {/* Use an explore icon */}
  <span style={{ borderBottom: '10px solid #FFFF00', paddingBottom: '5px' }}>
    Explore Your Neighbourhood Communities!
  </span>
</Typography>
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <TextField
              id="outlined-basic"
              autoComplete="off"
              label="Search..."
              variant="outlined"
              sx={{
                width: '20%',
                backgroundColor: 'white',
                borderColor: 'black',
                marginBottom: '10px',
              }}
              value={searchText}
              onChange={handleSearchChange}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'green',
                width: '20%',
                marginTop: '10px',
              }}
              onClick={handleSearchButtonClick}
            >
              Just ask
            </Button>
          </FormControl>
      
      </Box>
      <Box>
        
      </Box>
      <div><DashFooter/></div>
    </>

  );
};


export default Public