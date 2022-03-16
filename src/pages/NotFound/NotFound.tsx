import React from "react";
import { useNavigate } from "react-router";
import imgNotfound from "../../assets/logo/404.png";
import "./NotFound.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>ádsad</div>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     width: "100%",
    //     height: "100%",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Box>
    //     <img alt="NotFound" src={imgNotfound} className="img-notfound" />
    //   </Box>
    //   <Box>
    //     <Button
    //       variant="contained"
    //       color="error"
    //       className="button-back"
    //       onClick={() => navigate("/login")}
    //     >
    //       Back
    //     </Button>
    //   </Box>
    // </Box>
  );
};

export default NotFound;
