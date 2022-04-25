import api from "api/common";

export const getJobLogsList = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/job_logs`,);
}