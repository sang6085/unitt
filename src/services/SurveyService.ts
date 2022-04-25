import api from "api/common";
export const getTriggerSurvey = () => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/surveytrigger/gentriggerbylocation/1652`
  );
};

export const getHealthDeclaration = () => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-health-declaration`
  );
};

export const setHealthDeclaration = (requestBody: any) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/core/v1.2/survey/set-health-declaration-survey/1652`,
    requestBody
  );
};
