
import { onRequest } from "../hooks/http.hook";
import { IToken } from "../types/types";

const Service = () => {
  const _apiBase = "https://frontend-test-assignment-api.abz.agency/";
  const _count = 6;    

  const getUsers = async (count = _count) => {
    const res = await onRequest(`${_apiBase}api/v1/users?count=${count}`);
    return  await res;
  };

  const getToken = async () => {
    const res = await onRequest(`${_apiBase}api/v1/token`);
    return res;
  };

  const getPosition = async () => {
    const res = await onRequest(`${_apiBase}api/v1/positions`);
    return res;
  };

  const postUser = async (formData: BodyInit) => {
    const token: IToken = await getToken();
    
    if (token && typeof token.token === 'string') {
        const res = await onRequest(`${_apiBase}api/v1/users`, {
            method: "POST",
            body: formData,
            headers: { Token: token.token },
          });
          return await res;
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
