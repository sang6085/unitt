import api from "../api/common"


export const getAllGroupPermission = () =>{
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-group-permission`)
}