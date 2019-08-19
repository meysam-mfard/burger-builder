import reducer from './auth';
import * as actionType from '../actions/actionTypes';

describe('auth reducer', () => {
    const dummyToken = 'dummyToken';
    const dummyUserId = 'dummyUserId';
    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: null,
        redirectPath: '/'
    };

    it('should return the initialState', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            redirectPath: '/'
        });
    });

    it('should store the token upon login', function () {
        expect(reducer({...initialState}, {
            type: actionType.AUTH_SUCCESS,
            idToken: dummyToken,
            userId: dummyUserId
        })).toEqual({
            ...initialState,
            token: dummyToken,
            userId: dummyUserId,
            error: null,
            loading: false
        })
    });

    it('should reset the state to initialState upon logout', function () {
        expect(reducer({
            token: dummyToken,
            userId: dummyUserId
        }, {type: actionType.AUTH_LOGOUT}))
            .toEqual({...initialState})
    });
});