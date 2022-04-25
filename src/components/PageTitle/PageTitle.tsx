import { IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../stores/Store";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useStyles } from "./PageTitleStyles";

const PageTitle = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const baseState = useAppSelector((state) => state.base);

  return (
    <Stack direction="row" alignItems="center" className={classes.boxArea}>
      <Typography variant="h6" className={classes.currentPage}>
        {baseState?.pageUrl?.length &&
          t(baseState?.pageUrl[baseState?.pageUrl?.length - 1]?.title as string)}
      </Typography>

      <IconButton onClick={() => navigate("/dashboard")} className={classes.button}>
        <HomeOutlinedIcon fontSize="small" className={classes.iconColor} />
      </IconButton>

      <Stack direction="row" alignItems="center">
        {baseState?.pageUrl?.map((item, index) => (
          <Typography variant="body2" className={classes.titleHeader} key={index}>
            {item?.url ? (
              <Link to={item?.url}>- {t(item?.title as string)}</Link>
            ) : (
              `- ${t(item?.title as string)}`
            )}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default PageTitle;
