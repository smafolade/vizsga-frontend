import {AppBar, Box, Button, Toolbar, Typography, Tooltip} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import * as React from "react";
import {useAuth} from "../hooks/useAuth";
import {useModals, MODALS} from "../hooks/useModal";
import {FaUser} from 'react-icons/fa';
import {MdHowToReg} from 'react-icons/md';
import {BiLogIn, BiLogOut} from 'react-icons/bi';
import {GiMoneyStack} from 'react-icons/gi';

export default function AppMenu() {

  const navigate = useNavigate();
  const {showModal} = useModals();
  const {authToken, logout, sessionUser} = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {
              navigate("/");
            }}>Charity Wallets</Typography>

          {authToken === false && (<>
            <Tooltip title="Login">
             <Button color="inherit" onClick={() => {
                showModal(MODALS.LOGIN);
            }}>
                <BiLogIn size={42} />
              </Button>
            </Tooltip>

            <Tooltip title="Registration">
              <Button color="inherit" onClick={() => {
                showModal(MODALS.REG);
              }}>
                <MdHowToReg size={42} />
              </Button>
            </Tooltip>
            </>)}
          {authToken !== false && (<>
            <Tooltip title="My Donations">
            <Button color="inherit" onClick={() => {
                navigate("/me");
            }}>
              <GiMoneyStack size={42} />
            </Button>
            </Tooltip>

            <Tooltip title="Logout">
              <Button color="inherit" onClick={logout}>
                <BiLogOut size={42} />
              </Button>
            </Tooltip>

            <Typography variant="h6" component="div" ><FaUser style={{marginRight: 2}}/> {sessionUser.name} </Typography>
          </>)}

        </Toolbar>
      </AppBar>
    </Box>
  );
}