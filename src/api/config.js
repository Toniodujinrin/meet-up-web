import axios from "axios";

const client = axios.create({
  // baseURL:"http://localhost:3003/api"
  baseURL:"https://meetup-server.top/api"
})



client.interceptors.request.use(
        (config) =>{
            try {
               if(!window.localStorage.getItem("token")) return config
                config.headers["authorization"] = window.localStorage.getItem("token")
                
                return config
            } catch (error) {
                return Promise.reject(error)
            }
        }
)




export const get = async (route, auth = {}) => {
    const res = await client.get(`/${route}`, auth);
    return res;
  };
  export const post = async (route, data) => {
    const res = await client.post(`/${route}`, data);
    return res;
  };
  export const put = async (route, data) => {
    const res = await client.put(`/${route}`, data);
    return res;
  };
  export const patch = async (route, data) => {
    const res = await client.patch(`/${route}`, data);
    return res;
  };
  export const _delete = async (route) => {
    const res = await client.delete(`/${route}`);
    return res;
  };
  