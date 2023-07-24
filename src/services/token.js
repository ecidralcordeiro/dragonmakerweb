import blogFetch from "../axios/config.js";
import { user, password } from "../constantes.js";
import { setCookie } from "../section/cookie.js";

const getToken = async () => {
  try {
    const userData = {
      login: user,
      password: password,
    };

    const response = await blogFetch.post("/auth/login", userData);
    let token = response.data;  

    setCookie("token", token, 7);
    setCookie("login", true, 7);
    
    console.log("tokeASDASDASDASDSADASDASDASDASDASDASDSADn: ")
    console.log("token: " + token )
    return token
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default  getToken;

