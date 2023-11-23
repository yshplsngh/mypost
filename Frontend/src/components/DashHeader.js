import React, { useState } from "react";
import nityam_logo from "./logo/text.png";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  Drawer,
  Popover,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const DashHeader = () => {
  const [mobile, setMobile] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleDrawer = () => {
    setMobile(!mobile);
  };

  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };
  const [user] = useAuthState(auth);
  console.log("User Data:", user);

  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/')
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
        <Link to="/">
          <Button variant="text" style={{ color: "black" }} fullWidth>
            <b>Communities</b>
          </Button>
        </Link>
        <Link to="/tasker">
          <Button variant="text" style={{ color: "black" }} fullWidth>
            <b>Business</b>
          </Button>
        </Link>
        <Link to="/tasker">
          <Button variant="text" style={{ color: "black" }} fullWidth>
            <b>About us</b>
          </Button>
        </Link>

        <Link to="/login">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "rgb(144, 238, 144)",
              },
            }}
            fullWidth
          >
            Login
          </Button>
        </Link>
        <Popover
  open={Boolean(profileAnchor)}
  anchorEl={profileAnchor}
  onClose={() => setProfileAnchor(null)}
>
  <Card sx={{ borderRadius: "20px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}>
    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      {user && (
        <>
          <img
            src={user.photoURL || 'default-profile-image-url'}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="Profile Image"
          />
          <Typography variant="h6" component="div" sx={{ color: "black", fontWeight: "bold" }}>
            {user.displayName}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </>
      )}
    </CardContent>
  </Card>
</Popover>

      </Stack>
    </Box>
  );
console.log(user);

  return (
    <AppBar color="" position="sticky" component="nav">
      <StyledToolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          sx={{ display: { sm: "none", md: "none", lg: "none" } }}
          onClick={handleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={nityam_logo}
          style={{
            width: "auto",
            height: "55px",
            marginRight: "16px",
          }}
          alt=""
        />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "block", sm: "block" }}}
        >
          <Link to="/">
            <Button
              variant="text"
              color="primary"
              sx={{ borderColor: "black" }}
            >
              <Typography variant="h7" component="div" sx={{ color: "black" }}>
                <b>Communities</b>
              </Typography>
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="text"
              color="primary"
              sx={{ borderColor: "black" }}
            >
              <Typography variant="h7" component="div" sx={{ color: "black" }}>
                <b>Business</b>
              </Typography>
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="text"
              color="primary"
              sx={{ borderColor: "black" }}
            >
              <Typography variant="h7" component="div" sx={{ color: "black" }}>
                <b>About us</b>
              </Typography>
            </Button>
          </Link>
          {!user && (
            <Link to="/login">
              <Button variant="contained" style={{ backgroundColor: "green" }}>
                <Typography
                  variant="h7"
                  component="div"
                  sx={{ md: "block" }}
                >
                  Login
                </Typography>
              </Button>
            </Link>
          )}
          {user && user.photoURL && ( // Added null check
            <IconButton onClick={handleProfileClick}>
              <img
                src={user.photoURL || 'default-profile-image-url'}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginTop: "",
                  display:"flex",
                  alignContent:"center",
                }}
              />
            </IconButton>
          )}
          <Popover
            open={Boolean(profileAnchor)}
            anchorEl={profileAnchor}
            onClose={() => setProfileAnchor(null)}
          >
            <Card sx={{ borderRadius: "20px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}>
  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
    {user && (
      <>
        <img
          src={user.photoURL || 'default-profile-image-url'}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          alt="Profile Image"
        />
        <Typography variant="h6" component="div" sx={{ color: "black", fontWeight: "bold" }}>
          {user.displayName}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </>
    )}
  </CardContent>
</Card>

          </Popover>
        </Stack>
      </StyledToolbar>
      <Drawer
        variant="temporary"
        open={mobile}
        onClose={handleDrawer}
        sx={{ display: { md: "none", lg: "none" } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default DashHeader;
