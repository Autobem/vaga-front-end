import axios from 'axios';
import Cookies from 'js-cookie';

const standard = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});

if(Cookies.get('access_token')){
  standard.defaults.headers.common['Authorization'] = Cookies.get('access_token');
}

standard.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// standard.interceptors.response.use(..., ...)

export default standard;
