import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { searchEvents } from "services/EventsService";
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTheme } from "contexts/ThemeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStyles } from "pages/EventsManagement/EventsManagementStyle";
import { useEffect, useState, useCallback } from "react";


const EventsManagement = () => {
  const useThemeContext = useTheme();
  const styles = useStyles({
    color: useThemeContext.colorTheme,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [initialEvents, setInitialEvents] = useState<EventInput[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>();

  const { register, handleSubmit, reset } = useForm<{ newEvent: string }>();

  let eventGuid = 0;

  const [eventToDel, setEventToDel] = useState<EventClickArg | undefined>(undefined);
  const [eventToAdd, setEventToAdd] = useState<DateSelectArg | undefined>(undefined);

  useEffect(() => {
    searchEvents({
      pageIndex: 1,
      pageSize: 10,
      isPaging: true,
      orderBy: "created_date",
      isDesc: true,
      branchIds: [1747],
      fromDate: "2021-10-01T03:49:53.821Z",
      toDate: "2021-10-08T03:49:53.821Z",
    }).subscribe(async (response: any) => {
      console.log(response);
      if (response.data.data !== null) {
        const initialData = await response?.data.data.map((item: any) => ({
          id: item.id,
          title: item.eventName,
          start: item.startDate,
          end: item.endDate,
        }));
        setInitialEvents(initialData);
        setLoading(false);
      }
    });
  }, []);

  const handleEvents = useCallback((events: EventApi[]) => setCurrentEvents(events), []);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setEventToAdd(selectInfo);
  }, []);

  const handleCloseDel = () => {
    setEventToDel(undefined);
  };

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    setEventToDel(clickInfo);
  }, []);

  const handleDeleteEvent = () => {
    eventToDel?.event.remove();
    handleCloseDel();
  };

  const handleCloseAdd = () => {
    setEventToAdd(undefined);
  };

  const handleAddEvent: SubmitHandler<{ newEvent: string }> = (data) => {
    let calendarApi = eventToAdd?.view.calendar;
    if (calendarApi) {
      calendarApi?.unselect();
      calendarApi?.addEvent({
        id: String(eventGuid++),
        title: data.newEvent,
        start: eventToAdd?.startStr,
        end: eventToAdd?.endStr,
        allDay: eventToAdd?.allDay,
      });
    }
    handleCloseAdd();
    reset();
  };

  return (
    <Box>
      <Box>
        {!loading ? (
          <Paper sx={{ borderRadius: 2, p: 4 }} className={styles.calendarRoot}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              editable={true}
              initialEvents={initialEvents}
              eventsSet={handleEvents}
              select={handleDateSelect}
              eventClick={handleEventClick}
              height={700}
              headerToolbar={{
                left: "prev today next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
            />
          </Paper>
        ) : null}
      </Box>

      {/* dialog remove */}
      <Dialog
        open={eventToDel ? true : false}
        onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"View/Delete Events"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {eventToDel ? eventToDel.event.title : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel}>Close</Button>
          <Button onClick={handleDeleteEvent} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog add event */}
      <Dialog open={eventToAdd ? true : false} onClose={handleCloseAdd}>
        <DialogTitle>Add Events</DialogTitle>
        <form onSubmit={handleSubmit(handleAddEvent)}>
          <DialogContent>
            <TextField
              {...register("newEvent")}
              autoFocus
              margin="dense"
              id="name"
              label="Event Name"
              type="text"
              variant="standard"
              sx={{ width: 500 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Close</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default EventsManagement;
