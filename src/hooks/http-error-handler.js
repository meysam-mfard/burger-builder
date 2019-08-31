import {useState, useEffect} from 'react';

export  default axios => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    }, err => {
        setError(err);
    });

    const resInterceptor = axios.interceptors.response.use(resp => resp, err => {
        setError(err);
    });


    useEffect(() => {
        //cleanup function (when returning a function, it is run during cleanup)
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [axios.interceptors.request, axios.interceptors.response, reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};