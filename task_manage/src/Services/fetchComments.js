


import { domain } from '../Store/constants';
import axios from 'axios';

let cancelToken;

export const fetchComments = async (id) =>
{
    if (typeof cancelToken != typeof undefined)
    {
        cancelToken.cancel("Cancel")
    }
    cancelToken = axios.CancelToken.source()

    const url = `${domain}/comment/${id}/`;

    const tokens = localStorage.getItem('tokens');

    if (tokens)
    {
        const access = (JSON.parse(tokens))['access']
        const headers = {
            Authorization: `Bearer ${access}`
        };

        return axios.get(url, { headers }, { cancelToken: cancelToken.token }).then((response) =>
        {
            return {
                status: response.status,
                data: response.data
            }
        }).catch(() =>
        {
            return {
                status: '401',
                data: []
            }
        })
    }
    else
    {
        return {
            status: '401',
            data: []
        }
    }
}