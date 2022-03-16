import { Box, Grid, Paper, Typography, Button, Snackbar, Alert } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { errorHandle } from "../../utils/errorHandler";
import FallBackComponent from "../../components/FallBackComponent/FallBackComponent";

import { updateUserProfile, uploadAvatar } from "../../services/AccountService";
import FormWidget from "../../components/FormGeneration/FormWidget";
const vertical = "top";
const horizontal = "right";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[500],
    "&:hover": {
      backgroundColor: alpha(green[500], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[500],
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  layoutAvatar: {
    padding: 24,
    height: 450,
    display: "flex",
    flexDirection: "column",
  },
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "16px 0",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  borderAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: 150,
    height: 150,
    borderRadius: "50%",
    padding: 8,
    border: "1px dashed",
  },

  buttonUpload: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    width: 125,
  },

  boxEmailVerified: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    p: "16px 0",
  },
});

const Profile = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.profile?.info);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const schema = {
    type: "object",
    require: ["firstName, lastName, email, phoneNumber"],
    properties: {
      firstName: {
        type: "string",
        title: "FirstName",
        default: userProfile?.firstName,
      },
      lastName: {
        type: "string",
        title: "Last Name",
        default: userProfile?.lastName,
      },
      email: {
        type: "string",
        title: "Email",
        default: userProfile?.email,
        disabled: true,
      },
      phoneNumber: {
        type: "string",
        title: "Phone Number",
        default: userProfile?.phoneNumber,
      },
    },
  };

  const uiSchema = {
    isActive: {
      "ui:widget": "radio",
    },
  };

  const onSubmit = (data: any) => {
    dispatch(
      updateUserProfile({
        email: userProfile?.email,
        firstName: data.formData.firstName ?? userProfile?.firstName,
        lastName: data.formData.lastName ?? userProfile?.lastName,
        phoneNumber: data.formData.phoneNumber ?? userProfile?.phoneNumber,
      })
    ).subscribe((response: any) => {      
      if(response?.data.success){
        setOpenAlert(true);
      }
    });
  };

  const uploadFile = (event: any) => {
    const file = event.target?.files[0];
    const data = new FormData();
    data.append("FileContent", file);
    dispatch(uploadAvatar(data));
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.profile")}
        </Typography>
      </Box>
      <Box className="content">
        <Grid container spacing={3}>
          <ErrorBoundary
            FallbackComponent={FallBackComponent}
            onError={errorHandle}
          >
            <Grid item xs={4}>
              <Paper className={styles.layoutAvatar} sx={{ borderRadius: 3 }}>
                <Box className={styles.boxAvatar}>
                  <Box className={styles.borderAvatar}>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={uploadFile}
                      />
                      <Button
                        component="span"
                        className={styles.buttonUpload}
                        sx={{ borderRadius: "50%" }}
                      >
                        {userProfile?.avatarUrl ? (
                          <img
                            src={userProfile?.avatarUrl}
                            alt="avatar"
                            style={{
                              height: 125,
                              width: 125,
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <React.Fragment>
                            <PhotoCamera />
                            <Typography component="p" sx={{ fontSize: 13 }}>
                              Upload photo
                            </Typography>
                          </React.Fragment>
                        )}
                      </Button>
                    </label>
                  </Box>
                  <Typography component="p" style={{ fontSize: 14 }}>
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                  <Typography component="p" style={{ fontSize: 14 }}>
                    max size of 3.1MB
                  </Typography>
                </Box>
                <Box className={styles.boxEmailVerified}>
                  <Typography sx={{ fontWeight: 500 }}>
                    Email Verified
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography sx={{ fontSize: 15 }}>
                        Disable this will automatically send the user a
                        vetification email
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <GreenSwitch {...label} defaultChecked />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </ErrorBoundary>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              borderRadius: 3,
              width: "60%",
              ml: 5,
              mt: 3,
            }}
          >
            <Box sx={{ width: "80%" }}>
              <FormWidget
                schema={schema}
                onSubmit={onSubmit}
                uiSchema={uiSchema}
                titleBtn={t("button.save")}
                position={"flex-end"}
              />
            </Box>
          </Paper>
        </Grid>
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Updated Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Profile;
