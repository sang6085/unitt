import { Box, } from "@mui/material";
import Ticket from "components/Ticket/Ticket";

const ticketData = {
  serial: "O000121003482",
  type: "Bình thường",
  case: "Không ưu tiên",
  area: "Hà Nội",
  line: "Ocean Park 02",
  tem_expired_date: ["2021-11-30T16:59:59Z"],
};

const Visitors = () => {

  return (
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
  );
};

export default Visitors;
