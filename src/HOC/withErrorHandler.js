import React, {Component} from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {


        constructor(props) {
            super(props);
            this.state = {
                error: null
            };

            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            }, error => {
                this.setState({error: error})
            });

            axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error})
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            );
        }

    }
};

export default withErrorHandler;