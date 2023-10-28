


import { domain } from '../Store/constants';
import axios from 'axios';

let cancelToken;

export const login = async (username, password) =>
{
    if (typeof cancelToken != typeof undefined)
    {
        cancelToken.cancel("Cancel")
    }
    cancelToken = axios.CancelToken.source()
    const data = {
        username: username,
        password: password
    }
    const url = `${domain}/api/token/`;
    return axios.post(url, data, { cancelToken: cancelToken.token }).then((response) =>
    {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((response) =>
    {
        return {
            status: '401',
            data: []
        }
    })
}