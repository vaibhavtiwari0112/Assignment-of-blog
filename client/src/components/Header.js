import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [value, setValue] = useState();

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2196f3" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            My Blog APP
          </Typography>
          {isLogin && (
            <Box display="flex">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
                sx={{ "& .Mui-selected": { color: "yellow" } }}
              >
                <Tab
                  label="Blogs"
                  LinkComponent={Link}
                  to="/blogs"
                  sx={{ "&:hover": { backgroundColor: "#1565c0" } }}
                />
                <Tab
                  label="My Blogs"
                  LinkComponent={Link}
                  to="/my-blogs"
                  sx={{ "&:hover": { backgroundColor: "#1565c0" } }}
                />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                  sx={{ "&:hover": { backgroundColor: "#1565c0" } }}
                />
              </Tabs>
            </Box>
          )}
          <Box display="flex">
            {!isLogin && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    margin: 1,
                    color: "white",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    margin: 1,
                    color: "white",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{
                  margin: 1,
                  color: "white",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
