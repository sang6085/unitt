import api from "api/common";

export const getDataSystemSetting = () =>{
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/system-settings`)
}