import { CircularProgress, Stack } from "@mui/material";

const Progress = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <CircularProgress color="primary" />
    </Stack>
  );
};

export default Progress;
