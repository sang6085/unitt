import React, { FC } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import StatusCard, {
  IStatusCard,
} from "../../components/StatusCard/StatusCard";

import { useAppSelector } from "../../stores/Store";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import logoOne from "../../assets/logo/bankofamerica.svg";
import logoTwo from "../../assets/logo/deutschebank.svg";
import logoThree from "../../assets/logo/wellsfargo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { StyleButtonComponent } from "../../components/Button/StyledButton";
import CountUp from "react-countup";
import TopLanding from "../../components/TopLanding/TopLanding";


const DashBoardPage: FC = () => {
  const userProfile = useAppSelector((state) => state.profile.info);

  const [valueBtn, setValueBtn] = React.useState<string>("Today");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    setValueBtn(e.target.innerHTML);
    setAnchorEl(null);
  };

  const listBtnOne = [
    { text: "Today" },
    { text: "Yesterday" },
    { text: "Last Month" },
    { text: " Last Year" },
  ];

  const [listCard] = React.useState<IStatusCard[]>([
    {
      name: "Transfers",
      number: 2395,
      icon: <AccountBalanceWalletOutlinedIcon />,
      growth: 51,
      bgIcons:
        "linear-gradient(135deg, rgb(107, 115, 255) 0%, rgb(0, 13, 255) 100%)",
    },
    {
      name: "Bills",
      number: 785,
      icon: <ReceiptOutlinedIcon />,
      growth: 8,
      bgIcons:
        "linear-gradient(135deg, rgb(255, 247, 32) 0%, rgb(60, 213, 0) 100%)",
    },
    {
      name: "Requests",
      number: 4486,
      icon: <RequestQuoteOutlinedIcon />,
      growth: -23,
      bgIcons:
        "linear-gradient(135deg, rgb(67, 203, 255) 0%, rgb(151, 8, 204) 100%)",
    },
    {
      name: "Payments",
      number: 251,
      icon: <AccountBalanceOutlinedIcon />,
      growth: 76,
      bgIcons:
        "linear-gradient(135deg, rgb(252, 207, 49) 0%, rgb(245, 85, 85) 100%)",
    },
  ]);

  // React.useEffect(() => {
  //   getDashboardInfo([1747]).then((res) => {
  //     setListCard([
  //       {
  //         name: t("dashboard.chart_1"),
  //         number: res.data.totalInviteToday,
  //         icon: "invite visitor",
  //         growth: +1,
  //       },
  //       {
  //         name: t("dashboard.chart_2"),
  //         number: res.data.totalInvitationCheckedinToday,
  //         icon: "visitor came",
  //         growth: +1,
  //       },
  //       {
  //         name: t("dashboard.chart_3"),
  //         number: res.data.totalCheckedinToday,
  //         icon: "checked in",
  //         growth: -1,
  //       },
  //       {
  //         name: t("dashboard.chart_4"),
  //         number: res.data.totalCheckedoutToday,
  //         icon: "checked out",
  //         growth: -0.9,
  //       },
  //     ]);
  //   });
  // }, [t]);


  return (
    <Box>
      <Box className="title">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography component="h2" variant="h5" sx={{ fontWeight: "700" }}>
              Hello, {userProfile?.fullName}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              sx={{ fontSize: 15, fontWeight: 400, color: "gray" }}
            >
              Check the latest banking stats under this beautiful dashboard!
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyleButtonComponent
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              onClose={handleClose}
              open={open}
              list={listBtnOne}
              anchorEl={anchorEl}
              value={valueBtn}
            />
          </Box>
        </Box>
      </Box>
      <Box className="content">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {listCard.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <StatusCard
                    bgIcons={item.bgIcons}
                    name={item.name}
                    number={item.number}
                    icon={item.icon}
                    growth={item.growth}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Paper
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  pt: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="h2"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Main Account
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography component="h6" sx={{ color: "gray" }}>
                    Available
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "rgb(68, 214, 0)" }}
                  >
                    ${" "}
                    <CountUp
                      end={Number(98346.53) || 0}
                      duration={Number(3)}
                      decimals={2}
                      separator=","
                    />
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={logoOne}
                    style={{ width: "98px", marginRight: "15px" }}
                    alt="aa"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                      Bank of America - Savings Account
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h5"
                      sx={{ color: "gray", mt: 1, mb: 2 }}
                    >
                      00 2222 5555 2222 72
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography sx={{ fontWeight: 400, fontSize: "14px" }}>
                        ACC:
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", ml: 1, fontSize: "14px" }}
                      >
                        3544 57214
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography sx={{ fontWeight: 400, fontSize: "14px" }}>
                        BSB:
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", ml: 1, fontSize: "14px" }}
                      >
                        721 352
                      </Typography>
                    </Box>
                  </Box>
                  <img
                    src={logoOne}
                    style={{ width: "180px", opacity: 0.3 }}
                    alt="aa"
                  />
                </Box>
              </Box>
              <Box sx={{ px: 3, py: 5, background: "rgba(34, 51, 84, 0.02)" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 1.5,
                    textTransform: "initial",
                    fontWeight: 600,
                  }}
                >
                  Transfer money
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mx: 1,
                    borderRadius: 1.5,
                    textTransform: "initial",
                    fontWeight: 600,
                  }}
                >
                  Link account
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h2"
                      sx={{ fontSize: 15, fontWeight: "bold" }}
                    >
                      Deutsche Bank
                    </Typography>
                    <img src={logoTwo} alt="aa" />
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography component="h6" sx={{ fontWeight: 400 }}>
                        ACC:
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{ fontWeight: "bold", ml: 1 }}
                      >
                        3544 57214
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography component="h6" sx={{ fontWeight: 400 }}>
                        BSB:
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{ fontWeight: "bold", ml: 1 }}
                      >
                        721 352
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${" "}
                      <CountUp
                        end={22674.32}
                        duration={Number(2)}
                        separator=","
                      />
                    </Typography>
                    <IconButton aria-label="settings">
                      <MoreVertIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h2"
                      sx={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      Wells Fargo
                    </Typography>
                    <img src={logoThree} alt="aa" />
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography component="h6" sx={{ fontWeight: 400 }}>
                        ACC:
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{ fontWeight: "bold", ml: 1 }}
                      >
                        645 45456
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "gray",
                      }}
                    >
                      <Typography component="h6" sx={{ fontWeight: 400 }}>
                        BSB:
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{ fontWeight: "bold", ml: 1 }}
                      >
                        845 284
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ fontWeight: "bold" }}
                    >
                      $
                      <CountUp end={854.0} duration={Number(2)} separator="," />
                    </Typography>
                    <IconButton aria-label="settings">
                      <MoreVertIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Paper sx={{ height: "100%" }}>ád</Paper>
          </Grid>

          <Grid item xs={7} sx={{ mb: 3 }}>
            <Paper sx ={{ height: "100%" }}>
              <TopLanding />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashBoardPage;
