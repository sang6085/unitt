import api from "../api/api";
export interface IUpdateMenu {
  id: string;
  icon: string;
  sort: number;
  url: string;
  isActive: number;
  parentId: number;
}

export const getMenuAccount = () => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/menu/getbyaccount`
  );
};

export const getAllMenu = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API}/api/v1/menu/getall`);
};

export const getMenuById = (id: Number) => {
  return api.get(`${process.env.REACT_APP_PREFIX_API}/api/v1/menu/${id}`);
};

export const getParentListMenu = (menuId: number) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/menu/get-parrent-list/${menuId}`
  );
};

export const updateMenuById = (requestBody: IUpdateMenu) => {
  return api.put(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/menu/update/${requestBody.id}`,
    requestBody
  );
};
