import { IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../stores/Store";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const PageTitle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const baseState = useAppSelector((state) => state.base);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 3,
        width: "100%",
        height: 65,
        position: "fixed",
        background: "#f0f6ff",
        zIndex: 200,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          pr: 2,
          borderRight: "1px solid #CBD9EB",
          fontWeight: 300,
          textTransform: "capitalize",
        }}
      >
        {baseState?.pageUrl?.length &&
          t(
            baseState?.pageUrl[baseState?.pageUrl?.length - 1]?.title as string
          )}
      </Typography>

      <IconButton
        onClick={() => navigate("/dashboard")}
        sx={{ ml: 2, pt: "11px" }}
      >
        <HomeOutlinedIcon fontSize="small" sx={{ color: "#839bb3" }} />
      </IconButton>

      <Stack direction="row" alignItems="center">
        {baseState?.pageUrl?.map((item, index) => (
          <Typography
            variant="body2"
            sx={{ px: "3px", mt: "5px", fontWeight: 400, color: "#839bb3" }}
            key={index}
          >
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
