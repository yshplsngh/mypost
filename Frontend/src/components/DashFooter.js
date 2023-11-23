import React from 'react';
import { Container, Typography, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";
export const DashFooter = () => {
    return (
      <footer className='footer'>
        <Container sx={{paddingTop:"40px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <div className="gridOne">
                <div className="logoDiv">
                  {/* Your logo can be placed here */}
                </div>
                <Typography variant="body2" align="center">
                  Your mind should be stronger than your feelings
                </Typography>
                <div className="socialIcon flex">
                  <IconButton className='icon'>
                    <BsFacebook />
                  </IconButton>
                  <IconButton className='icon'>
                    <AiFillTwitterCircle />
                  </IconButton>
                  <IconButton className='icon'>
                    <FaInstagramSquare />
                  </IconButton>
                  <IconButton className='icon'>
                    <AiFillLinkedin />
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="footerLinks">
                <Typography variant="h6" className="linkTitle">
                  Quick Guide
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Explore" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Status" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Travel" />
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="footerLinks">
                <Typography variant="h6" className="linkTitle">
                  Quick Guide
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Explore" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Status" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Travel" />
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="footerLinks">
                <Typography variant="h6" className="linkTitle">
                  Quick Guide
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Explore" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Status" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Travel" />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </Container>
        <div className="copyRightDiv flex">
          <Typography variant="body2">
            My design | Developed By Surya Pratap Singh
          </Typography>
        </div>
      </footer>
    );
  };
  export default DashFooter;