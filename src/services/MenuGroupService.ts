import api from "api/common";
interface IRequestBodyInsert {
  menuId: [number];
}

export const getAllGroup = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-all-group`)
};

export const getMenuGroupById = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-menu-group-byid`)
};

export const getAllMenu = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-all-menu`)
};

export const insertByGroupId = (id: number, requestBody: IRequestBodyInsert) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/MenuGroup/insert/${id}`,
    requestBody
  );
};
