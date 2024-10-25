// import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import rest from "@feathersjs/rest-client";
import { createClient } from "integration-api";
import axios from "axios";

export const useApi = (baseUrl = "http://localhost:3030") => {
  const { accessToken } = useContext(AuthContext);

  // const createAxiosInstance = () => {
  //   const axiosClient = axios.create({
  //     baseURL: `${baseUrl}/${service}`,
  //     timeout: 30000,
  //     headers: { authorization: `Bearer ${accessToken}` },
  //   });

  //   return axiosClient;
  // };

  // const instance = useMemo(createAxiosInstance, [
  //   accessToken,
  //   baseUrl,
  //   service,
  // ]);

  const connection = rest(baseUrl).axios(
    axios.create({ headers: { authorization: `Bearer ${accessToken}` } })
  );

  const client = createClient(connection);

  return client;
};
