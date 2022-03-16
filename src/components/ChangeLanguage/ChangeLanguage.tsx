import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { Languages, LocalStorageKey } from "../../configs/consts";

import { useAppDispatch } from "../../stores/Store";
import PublicIcon from "@mui/icons-material/Public";
import { setLocale } from "../../pages/BaseLayout/ConfigSlice";

const ChangeLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [language, setLanguage] = React.useState(
    parseInt(localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1")
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (item: any) => {
    const id = Number(item?.id);
    setLanguage(id);
    const language = Languages.find((l) => l.id === id);
    i18n.changeLanguage(language?.shortName);
    localStorage.setItem(LocalStorageKey.LANGUAGE, id.toString());
    dispatch(setLocale({ locale: id.toString() }));
  };
  return (
    <>
      <Tooltip title={t(`language.language`) as string}>
        <IconButton onClick={handleClick}>
          <PublicIcon sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Languages.map((item: any, index: any) => (
          <MenuItem
            key={index}
            onClick={() => {
              changeLanguage(item);
              handleClose();
            }}
            value={language.toString()}
          >
            {language === item.id ? (
              <CheckIcon sx={{ color: "green", mr: 0.5 }} />
            ) : (
              <CheckIcon sx={{ opacity: 0, mr: 0.5  }} />
            )}{" "}
            {t(`language.${item.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChangeLanguage;
