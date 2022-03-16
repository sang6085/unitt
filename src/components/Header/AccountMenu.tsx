import React from "react";
import MenuComponent, { IMenu } from "../Menu/Menu";
import {
  Settings,
  PersonOutlined,
  AccountBalanceWalletOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { logout } from "../../services/AccountService";
import { useNavigate } from "react-router";
import msalInstance from "../../utils/auth/msal";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";

const AccountMenu = (props: IMenu) => {
  const navigate = useNavigate();
  const aadToken = useAppSelector((state) => state.login.aadToken);
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    if (aadToken) {
      await msalInstance.logoutPopup();
    }
    await dispatch(logout());
  };

  return (
    <MenuComponent {...props}>
      <MenuItem onClick={() => navigate("/profile")}>
        <ListItemIcon>
          <PersonOutlined fontSize="small" />
        </ListItemIcon>
        <Typography component="span" sx={{ fontSize: 15 }}>
          Profile
        </Typography>
      </MenuItem>
      <MenuItem sx={{ my: 1 }}>
        <ListItemIcon>
          <AccountBalanceWalletOutlined fontSize="small" />
        </ListItemIcon>
        <Typography component="span" sx={{ fontSize: 15 }}>
          My Wallet
        </Typography>
      </MenuItem>
      <MenuItem sx={{ my: 1 }}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <Typography component="span" sx={{ fontSize: 15 }}>
          Settings
        </Typography>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        <Typography component="span" sx={{ fontSize: 15 }}>
          Logout
        </Typography>
      </MenuItem>
    </MenuComponent>
  );
};

export default AccountMenu;
