import axios from "axios";
import jwtDecode from "jwt-decode";
import { addItem, getItem, removeItem } from "./LocaleStorage";

export function hasAuthenticated(){
    const token = getItem('miniblogToken');
    const result = token? tokenIsValid(token) : false;

    if(false === result){
        removeItem('miniblogToken')
    }
    return result;
}

export function Login(credentials){
    console.log(credentials)
    return axios
            .post("https://api.genuka.com/2021-10/clients/login", credentials)
            .then(Response => Response.data.access_token)
            .then(token => {
                
                addItem('miniblogToken', token)
                //localStorage.token = token

                return true;
            })
}

export function Register(credentials){
    console.log(credentials)
    return axios
            .post("https://api.genuka.com/2021-10/clients/register", credentials)
            .then(Response => Response.data.access_token)
            .then(token => {
                
                addItem('miniblogToken', token)

                return true;
            })
            
}

export function logout(){
    removeItem('miniblogToken');
}

export function tokenIsValid(token) {
    const { exp } = jwtDecode(token);

    if(exp * 1000 > new Date().getTime()){
        return true;
    }
    return false;
}