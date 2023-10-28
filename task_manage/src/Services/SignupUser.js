


import { domain } from '../Store/constants';
import axios from 'axios';

let cancelToken;

export const SignupUser = async (data) =>
{
    if (typeof cancelToken != typeof undefined)
    {
        cancelToken.cancel("Cancel")
    }
    cancelToken = axios.CancelToken.source()

    const url = `${domain}/register/`;

    return axios.post(url, data, { cancelToken: cancelToken.token }).then((response) =>
    {
        return {
            status: response.status,
            data: response.data
        }
    }).catch(() =>
    {
        return {
            status: '401',
            data: {}
        }
    })
}