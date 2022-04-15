import userEvent from "@testing-library/user-event";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";

const TESTING = false;

const BASE_URL_LOCAL = 'http://localhost:8787';
const BASE_URL_LIVE = 'https://wallet.phoesa.workers.dev';
const BASE_URL = TESTING ? BASE_URL_LOCAL : BASE_URL_LIVE;

export const AXIOS_METHOD = {
    'GET': 'GET',
    'POST': 'POST',
    'PUT': 'PUT',
    'DELETE': 'DELETE',
};
let authToken = false;

export function setApiToken(newToken) {
    authToken = newToken;
}

export function doApiCall(method, uri, onSuccess, onFailure = false, data = undefined) {
    axios({
        method,
        url: `${BASE_URL}${uri}`,
        data,
        headers: authToken !== false ? {'Authorization': `Bearer ${authToken}`} : {},
    }).then(res => {
        onSuccess(res.data);
    }).catch(err => {
        console.error(err);
        if (onFailure === false) {
            return;
        }
        onFailure(err?.response?.data?.error, err);
    });
}

export function useApi(method, uri, postData = undefined, deps = []) {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiCallCallback = useCallback((apiPostData) => {
        setLoading(true);
        doApiCall(method, uri, (responseData) => {
            //TEST
            setData(responseData);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setData(false);
            setLoading(false);
        }, apiPostData);
    }, [method, setData, setError, setLoading, uri]);

    useEffect(() => {
        apiCallCallback(postData);
    }, [apiCallCallback, JSON.stringify(postData), ...deps]);

    return [data, loading, error, apiCallCallback];
}