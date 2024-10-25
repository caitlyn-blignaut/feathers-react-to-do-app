import axios from "axios";
// import { useMemo } from "react";
import { createClient } from "to-do-api";
import rest from "@feathersjs/rest-client";

export const useUnauthenticatedApi = (baseUrl = "http://localhost:3030") => {
  // const createAxiosInstance = () => {
  //   const axiosClient = axios.create({
  //     baseURL: `${baseUrl}`,
  //   });

  //   return axiosClient;
  // };

  // const instance = useMemo(createAxiosInstance, [baseUrl]);

  const connection = rest(baseUrl).axios(axios);

  const client = createClient(connection);

  return client;
};
