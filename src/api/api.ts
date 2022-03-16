/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosResponse } from "axios";
import { defer, Observable } from "rxjs";
import { map } from "rxjs/operators";

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  const postResponse: Observable<AxiosResponse<T>> =  defer(() => axios.get<T>(url, { params: queryParams }))
    .pipe(map((result) => result))
  return postResponse as any;
};

const post = <T>(url: string, body: object, queryParams?: object, responseType?: "blob" | "json"): Observable<T | void> => {
  const postResponse:Observable<AxiosResponse<T>> =  defer(() => axios.post<T>(url, body, { params: queryParams, responseType: responseType  }))
    .pipe(map((result) => responseType ? result : result))
  return postResponse as any
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  const postResponse: Observable<AxiosResponse<T>> =  defer(() => axios.put<T>(url, body, { params: queryParams }))
      .pipe(map((result) => result))
  return  postResponse as any
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  const postResponse: Observable<AxiosResponse<T>> = defer(() => axios.delete(`${url}/${id}`))
    .pipe(map((result) => result))
  return  postResponse as any
};

export default { get, post, put, delete: deleteR };
