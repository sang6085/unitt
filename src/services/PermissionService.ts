import api from "../api/api";
export const searchEmployee = (requestBody: {
  keyword: string | "";
  pageIndex: number;
  pageSize: number;
}) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/Permission/search-employee`,
    requestBody
  );
};

export const getGroupByCompanyId = () => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/Permission/get-function-group-by-companyId`
  );
};

export const getFunction = (permissionId: number) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/core/v1/FunctionGroup/apiGetFunctions/${permissionId}`
  );
};

export const getMemberById = (permissionId: number) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/Permission/get-member-by-permission-id/${permissionId}`
  );
};

export const insertMember = (requestBody: {
  memberId: number;
  permissionId: number;
}) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/Permission/insert-member-permission`,
    requestBody
  );
};

export const deleteMember = (requestBody: {
  memberId: number;
  permissionId: number;
}) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/permission/delete-member-permission`,
    requestBody
  );
};
