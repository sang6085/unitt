import api from "../api/common";

interface IFeatureId { 
  id: number | string
}
export const getFeature = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/features`);
};

export const getFeatureById = (props: IFeatureId) => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/features/${props.id}`);
};