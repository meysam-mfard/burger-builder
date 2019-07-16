import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-react-9f1de.firebaseio.com/'
});

export default axiosInstance;