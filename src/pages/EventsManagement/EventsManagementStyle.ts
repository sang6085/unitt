import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    calendarRoot: (props: { color: string }) => {
      return {
        "& .fc-button-primary": {
          background: "none",
          color: props.color,
          border: "none",
        },
        "& .fc-button-primary:hover": {
          background: "none",
          color: props.color,
          border: "none",
        },
        "& .fc-button-primary:active": {
          background: "none",
          color: props.color,
          border: "none",
        },
        "& .fc-button-primary:disabled": {
          background: props.color,
          color: "#fff",
          border: "none",
        },
        "& .fc-button-primary:disabled:hover": {
          background: props.color,
          color: "#fff",
          borderColor: props.color,
        },
        "& .fc-button-primary:not(:disabled):active": {
          background: "none",
          color: props.color,
          border: "none",
          borderColor: "none",
        },
        "& .fc-button-primary:not(:disabled).fc-button-active": {
          background: props.color,
          color: "#fff",
          border: "1px solid",
          borderColor: props.color,
        },
        "& .fc-event-title": {
          textOverflow: "ellipsis",
        },
        "& table": {
          "& tr": {
            "& th": {
              background: "#fbfbfc",
              height: 50,
            },
          },
        },
      };
    },
  });