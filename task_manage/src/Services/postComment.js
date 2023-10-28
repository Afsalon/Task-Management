


import { domain } from '../Store/constants';
import axios from 'axios';

let cancelToken;

export const postComment = async (comment, id) =>
{
    if (typeof cancelToken != typeof undefined)
    {
        cancelToken.cancel("Cancel")
    }
    cancelToken = axios.CancelToken.source()
    const data = {
        'comment': comment
    }
    const url = `${domain}/comment/post/${id}/`;
    const tokens = localStorage.getItem('tokens');
    if (tokens)
    {
        const access = (JSON.parse(tokens))['access']
        const headers = {
            Authorization: `Bearer ${access}`
        };

        return axios.post(url, data, { headers, cancelToken: cancelToken.token }).then((response) =>
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
    else
    {
        return {
            status: '401',
            data: {}
        }
    }
}