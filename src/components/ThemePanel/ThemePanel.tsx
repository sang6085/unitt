import * as React from "react";
import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "../../Contexts/ThemeContext";
import { LocalStorageKey } from "../../configs/consts";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";
import MenuComponent from "../Menu/Menu";

interface IThemePanel {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  setRef?: (el: any) => void;
  run?: boolean;
}

const light = "#fbfafb";
const dark = "black";
const blue = "#349eff";
const red = "#fb0b12";
const cyan = "#10d4d2";
const green = "#019707";
const orange = "#d68102";

const ThemePanelComponent = (props: IThemePanel) => {
  const { t } = useTranslation();
  const { open, toggleDrawer, setRef } = props;
  const useThemeContext = useTheme();
  const currentMode: "dark" | "light" = useThemeContext.modeTheme;
  const currentColor: string = useThemeContext.colorTheme ?? blue;
  const currentNav: string = useThemeContext.navTheme
    ? useThemeContext.navTheme
    : currentMode === "dark"
    ? "#121212"
    : "#ffffff";

  // Font Family
  const [fontFamily, setFontFamily] = React.useState<string>("Roboto");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontFamily((event.target as HTMLInputElement).value);
    localStorage.setItem(LocalStorageKey.FONT_FAMILY, (event.target as HTMLInputElement).value);
    useThemeContext.setFontFamily((event.target as HTMLInputElement).value);
  };
  // Custom Color
  const [anchorElColor, setAnchorElColor] = React.useState<null | HTMLElement>(null);
  const openColorPicker = Boolean(anchorElColor);
  const [color, setColor] = React.useState<string>(currentColor);

  const handleClickPickerColor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElColor(event.currentTarget);
  };

  const handleClosePickerColor = () => {
    setAnchorElColor(null);
  };

  // Custom NavBar
  const [anchorElNavbar, setAnchorElNavbar] = React.useState<null | HTMLElement>(null);
  const openNavPicker = Boolean(anchorElNavbar);
  const [navTheme, setNavTheme] = React.useState<string>(currentNav);

  const handleClickNavPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavbar(event.currentTarget);
  };

  const handleCloseNavPicker = () => {
    setAnchorElNavbar(null);
  };

  const getMode = (name: string, text: "dark" | "light", color: string) => (
    <Box
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => {
        localStorage.setItem(LocalStorageKey.MODE_THEME, text);
        useThemeContext.setModeTheme(text);
      }}
    >
      {currentMode === text ? (
        <CheckCircleRoundedIcon fontSize="large" sx={{ color: color }} />
      ) : (
        <CircleIcon fontSize="large" sx={{ color: color }} />
      )}
      <Typography component="span" sx={{ mx: 1, fontSize: 15, fontWeight: 500 }}>
        {name}
      </Typography>
    </Box>
  );

  const getColor = (name: string, text: string, color: string) => (
    <Box
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => {
        localStorage.setItem(LocalStorageKey.COLOR_THEME, color);
        useThemeContext.setColorTheme(color);
        setColor(color);
      }}
    >
      {currentColor === color ? (
        <CheckCircleRoundedIcon fontSize="large" sx={{ color: color }} />
      ) : (
        <CircleIcon fontSize="large" sx={{ color: color }} />
      )}
      <Typography component="span" sx={{ mx: 1, fontSize: 15, fontWeight: 500 }}>
        {name}
      </Typography>
    </Box>
  );

  const ApplyCustomColor = () => {
    if (color.slice(0, 1) === "#") {
      localStorage.setItem(LocalStorageKey.COLOR_THEME, color);
      useThemeContext.setColorTheme(color);
    }
  };

  const ApplyCustomNav = () => {
    if (navTheme.slice(0, 1) === "#") {
      localStorage.setItem(LocalStorageKey.NAV_THEME, navTheme);
      useThemeContext.setNavTheme(navTheme);
    }
  };

  const defaultNavTheme = () => {
    localStorage.setItem(LocalStorageKey.NAV_THEME, "");
    useThemeContext.setNavTheme("");
    setNavTheme(currentMode === "dark" ? "#121212" : "#ffffff");
  };

  return (
    <Drawer anchor={"right"} open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 260, p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500 }}>
            {t("menu.themeSettings")}
          </Typography>
          <Box data-name="closeTheme" ref={setRef}>
            <CloseOutlinedIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={() => toggleDrawer(false)}
            />
          </Box>
        </Box>

        {/* Choose mode */}
        <Box sx={{ my: 1 }} data-name="chooseMode" ref={setRef}>
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500, mb: 1 }}>
            {t("theme.choose_mode")}
          </Typography>
          {getMode(t("theme.light"), "light", light)}
          {getMode(t("theme.dark"), "dark", dark)}
        </Box>

        {/* Choose Theme */}
        <Box sx={{ my: 1 }} data-name="chooseColor" ref={setRef}>
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500, mb: 1 }}>
            {t("theme.choose_color")}
          </Typography>
          {getColor(t("theme.blue"), "blue", blue)}
          {getColor(t("theme.red"), "red", red)}
          {getColor(t("theme.cyan"), "cyan", cyan)}
          {getColor(t("theme.green"), "green", green)}
          {getColor(t("theme.orange"), "orange", orange)}
        </Box>

        {/* Custom Theme */}
        <Box sx={{ my: 1 }} data-name="customColor" ref={setRef}>
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500, mb: 1 }}>
            {t("theme.custom_color")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Tooltip title="Color Picker">
              <IconButton onClick={handleClickPickerColor} size="small">
                <CircleIcon fontSize="large" sx={{ color: color }} />
              </IconButton>
            </Tooltip>
            <MenuComponent
              open={openColorPicker}
              anchorEl={anchorElColor}
              handleClose={handleClosePickerColor}
            >
              <Box>
                <HexColorPicker color={color} onChange={setColor} />
              </Box>
            </MenuComponent>
            <TextField
              fullWidth
              value={color}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
            />
            <IconButton sx={{ ml: 1 }} onClick={ApplyCustomColor}>
              <CheckOutlinedIcon color="success" />
            </IconButton>
          </Box>
        </Box>

        {/* Custom Navbar */}
        <Box sx={{ my: 1 }} data-name="customNavbar" ref={setRef}>
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500, mb: 1 }}>
            {t("theme.custom_nav")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Tooltip title="Color Picker">
              <IconButton onClick={handleClickNavPicker} size="small">
                <CircleIcon
                  fontSize="large"
                  sx={{
                    color: navTheme,
                    border: "1px solid #9e9e9e52",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Tooltip>
            <MenuComponent
              open={openNavPicker}
              anchorEl={anchorElNavbar}
              handleClose={handleCloseNavPicker}
            >
              <Box>
                <HexColorPicker color={navTheme} onChange={setNavTheme} />
              </Box>
            </MenuComponent>
            <TextField
              fullWidth
              value={navTheme}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNavTheme(e.target.value)}
            />
            <IconButton sx={{ ml: 1 }} onClick={ApplyCustomNav}>
              <CheckOutlinedIcon color="success" />
            </IconButton>
          </Box>
        </Box>

        {/* Font Family */}
        <Box sx={{ my: 1 }} data-name="fontFamily" ref={setRef}>
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500, mb: 1 }}>
            {t("theme.font_family")}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="font"
              value={fontFamily}
              name="radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel value="Roboto" control={<Radio />} label="Roboto" />
              <FormControlLabel value="Poppins" control={<Radio />} label="Poppins" />
              <FormControlLabel value="Inter" control={<Radio />} label="Inter" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Button Default Navbar */}
        <Box sx={{ display: "flex", flexGrow: 1 }} />
        <Box sx={{ my: 1 }} data-name="defaultNavbar" ref={setRef}>
          <Button variant="contained" color="primary" fullWidth onClick={defaultNavTheme}>
            {t("theme.default_nav_theme")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ThemePanelComponent;
