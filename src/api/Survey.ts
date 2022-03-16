import axios from "axios";

export const getTriggerSurvey = () => {
    const data = axios.get(`${process.env.REACT_APP_PREFIX_API}/api/surveytrigger/gentriggerbylocation/1652`)
    .then((response) => {
        if(response.data.success) {
            return response.data;
        }
    })
    return data;
}

export const getHealthDeclaration = () => {
    const data = axios.get(`${process.env.REACT_APP_PREFIX_API}/core/v1.2/survey/get-health-declaration-status/1652`)
    .then((response) => {
        if(response.data.success) {
            return response.data;
        }
    })
    return data;
}

export const setHealthDeclaration = (requestBody: any) => {
    const data = axios.post(`${process.env.REACT_APP_PREFIX_API}/core/v1.2/survey/set-health-declaration-survey/1652`, requestBody)
    .then((response) => {        
        return response.data.success;
    })
    return data;
}