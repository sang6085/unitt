import { IconButton, MenuItem, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { Languages, LocalStorageKey } from "configs/consts";
import {useState, FC } from "react";
import { useAppDispatch } from "stores/Store";
import LanguageIcon from "@mui/icons-material/Language";

import { setLocale } from "pages/BaseLayout/BaseSlice";
import Menu from "components/Menu/Menu";
import { CommonStyles } from "utils/styles";
import { useStyles } from "components/ChangeLanguage/ChangeLanguageStyles";

const ChangeLanguage: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const styles = CommonStyles();
  const classes = useStyles();
  const [language, setLanguage] = useState(
    parseInt(localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1")
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        <IconButton onClick={handleClick} className={classes.iconBtn}>
          <LanguageIcon className={styles.icons} />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} handleClose={handleClose}>
        {Languages.map((item: any, index: number) => (
          <MenuItem
            key={index}
            onClick={() => {
              changeLanguage(item);
              handleClose();
            }}
            value={language.toString()}
          >
            {language === item.id ? (
              <CheckIcon className={classes.checked} />
            ) : (
              <CheckIcon className={classes.uncheck} />
            )}{" "}
            {t(`language.${item.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChangeLanguage;
