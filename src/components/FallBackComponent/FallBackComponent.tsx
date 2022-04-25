import { Paper, Typography } from "@mui/material";
import { useStyles } from "components/FallBackComponent/FallBackComponentStyle";

const FallBackComponent = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.wrapperPaper}>
      <Typography className={classes.txt}>
        Wait, something seems to be wrong!
      </Typography>
    </Paper>
  );
};

export default FallBackComponent;
