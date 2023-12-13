import useHttp from "../hooks/http.hook";
import { TToken } from "../types/types";

const Service = () => {
  const _apiBase = "https://frontend-test-assignment-api.abz.agency/";
  const _count = 6;    


  const { request } = useHttp();

  const getUsers = async (count = _count) => {    
    const res = await request(`${_apiBase}api/v1/users?count=${count}`);
    return res.json();
  };

  const getToken = async () => {
    const res = await request(`${_apiBase}api/v1/token`);
    return res.json();
  };

  const getPosition = async () => {
    const res = await request(`${_apiBase}api/v1/positions`);
    return res.json();
  };

  const postUser = async (formData: BodyInit) => {
    const token: TToken = (await getToken());
    
    if (token && typeof token.token === 'string') {
      try {
        const res = await request(`${_apiBase}api/v1/users`, {
          method: "POST",
          body: formData,
          headers: { Token: token.token },
        });

        if (!res.ok) {
          return Promise.reject(res)
        }

        return Promise.resolve(res);
      } catch (e) {
        return Promise.reject(e)
      }
       
    }
   
  };

  return {
    getUsers,
    getToken,
    getPosition,
    postUser,
  };
};

export default Service;
