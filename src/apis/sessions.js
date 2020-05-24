import { registerSuccess } from '../actions/register';
import { loginError, loginSuccess } from '../actions/sessions';
import API from './CONFIG';
import { parseJSON } from "./utils";

export function login(userData, cb) {
    console.log(userData);
    return dispatch =>
        fetch(API.BASE + 'rest-auth/login/', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": userData.username,
                //'email': null,
                "password": userData.password,
            }),
        }).then(response => {
            //console.log(response);
            //debugger;
            if (response.ok) {
                const object = Object.assign(userData, { isLoggedIn: parseJSON(response) });
                dispatch(loginSuccess(object));
                cb();
                //console.log('ran callback function');
            }
        })
            .catch(error => {
                console.log('request failed', error);
                dispatch(loginError(error));
            })
        ;
}


export function signup(userData){
    return dispatch =>
        fetch(API.BASE + '?email='+ userData.email + '&password=' + userData.password + '&fullname=' + userData.name, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log(response);
            if (response.status >= 200 && response.status < 300 && response.ok) {
                dispatch(registerSuccess(userData));
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                dispatch(loginError(error));
                throw error;
            }
        })
            .catch(error => { console.log('request failed', error); });
}

