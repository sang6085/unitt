// import axios from "axios";
import api from "../api/api";

import { RequestEmployee } from "../interfaces/Employee";

export const getEmployee = (requestBody: RequestEmployee) => {
  return api.post(
    `https://api-demo.checkinpro.vn/atd/v1.1/employee/search`,
    requestBody
  );
};
