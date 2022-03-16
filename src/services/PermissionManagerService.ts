import api from "../api/common"


export const getDataPermission = () =>{
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-permission-data`)
}