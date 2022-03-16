import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Ticket from "../../components/Ticket/Ticket";

const ticketData = {
  serial: "O000121003482",
  type: "Bình thường",
  case: "Không ưu tiên",
  area: "Hà Nội",
  line: "Ocean Park 02",
  tem_expired_date: ["2021-11-30T16:59:59Z"],
};

const Visitors = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.visitors_management")}
        </Typography>
      </Box>
      <Box className="content">
        <Box sx={{ padding: 3, height: "100%" }}>
          <Ticket
            serial={ticketData.serial}
            type={ticketData.type}
            case={ticketData.case}
            area={ticketData.area}
            line={ticketData.line}
            tem_expired_date={ticketData.tem_expired_date}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Visitors;
