import api from "../api/api";
interface RequestBodyInsert {
  menuId: [number];
}

export const getAllGroup = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API}/core/v1/Group/getall`);
};

export const getMenuGroupById = () => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/MenuGroup/getbygroupid/1061`
  );
};

export const getAllMenu = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API}/api/v1/Menu/getall`);
};

export const insertByGroupId = (id: number, requestBody: RequestBodyInsert) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/MenuGroup/insert/${id}`,
    requestBody
  );
};
