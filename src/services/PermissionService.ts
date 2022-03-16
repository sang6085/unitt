import api from "../api/common";
export const searchEmployee = (requestBody: {
  keyword: string | "";
  pageIndex: number;
  pageSize: number;
}) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/search-employee`
  )
};

export const getGroupByCompanyId = () => {
 
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-function-group-by-companyId`
  )
};

export const getFunction = (permissionId: number) => {
  
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-functions`
  );
};

export const getMemberById = (permissionId: number) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-member-byid`
  )
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
