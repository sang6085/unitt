import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

interface ICalendar {
  data?: any;
  calendarRef?: any;
}
const Calendar = (props: ICalendar) => {
  return (
    <Box>
      <FullCalendar ref={props.calendarRef} plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </Box>
  );
};

export default Calendar;
