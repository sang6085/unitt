import { IconButton, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { Languages, LocalStorageKey } from "../../configs/consts";

import { useAppDispatch } from "../../stores/Store";
import LanguageIcon from "@mui/icons-material/Language";

import { setLocale } from "../../pages/BaseLayout/BaseSlice";
import Menu from "../Menu/Menu";
import { colors } from "../../utils/colors";
import { CommonStyles } from "../../utils/styles";

const ChangeLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const styles = CommonStyles();
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
      <Tooltip title={t(`header.language`) as string}>
        <IconButton onClick={handleClick} sx={{ mx: 1 }}>
          <LanguageIcon className={styles.icons} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        {Languages.map((item: any, index: any) => (
          <MenuItem
            key={index}
            onClick={() => {
              changeLanguage(item);
              handleClose();
            }}
            sx={{ color: colors.primaryColor }}
            value={language.toString()}
          >
            {language === item.id ? (
              <CheckIcon sx={{ color: "green", mr: 0.5 }} />
            ) : (
              <CheckIcon sx={{ opacity: 0, mr: 0.5 }} />
            )}{" "}
            {t(`language.${item.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChangeLanguage;
