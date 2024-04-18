import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://intunqa.uninorte.edu.co/sba-estudiantes/api/v1/matricula/user/vergaradl/periodo/202310',
  timeout: 5000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    myLogger.error("an error occurred while calling the api", error);
    return Promise.reject(error);
  }
);