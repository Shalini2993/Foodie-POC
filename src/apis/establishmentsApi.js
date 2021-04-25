import axios from 'axios';

axios.defaults.headers.common = {
    "user-key": "ebce07efec80d0017e1a3ee7173cdbd6",
};

const getUserDetailsApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1"
});

export default getUserDetailsApi;
