import React, {useState, useEffect} from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }, error => {
            this.setState({error: error})
        });

        const resInterceptor = axios.interceptors.response.use(resp => resp, err => {
            setError(err);
        });


        useEffect(() => {
            //cleanup function (when returning a function, it is run during cleanup)
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor)
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };


        return (
            <>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </>
        );


    }
};

export default withErrorHandler;