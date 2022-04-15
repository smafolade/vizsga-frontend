import {useCallback, useEffect, useState} from "react";
import {AXIOS_METHOD, doApiCall} from "./useApi";

export default function useWallets(limit = 5, uri = '/allwallets') {
    const [cursor, setCursor] = useState("");
    const [wallets, setWallets] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const apiCallCallback = useCallback((newCursor) => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.GET, uri, (responseData) => {
            /*setWallets(oldWallets => {
                if (oldWallets === false || newCursor === "") {
                    return responseData?.user.wallets;
                }
                return [...oldWallets, ...responseData?.user.wallets]
            });*/
            setWallets(responseData);
            //setCursor(responseData?.cursor);
            //TEST
            setHasMore(false);
            //setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setWallets(false);
            setHasMore(true);
            setCursor("");
            setLoading(false);
        });
    }, [setWallets, setError, setLoading, setHasMore]);

    const resetWalletList = useCallback(() => {
        apiCallCallback("");
    }, [apiCallCallback]);

    useEffect(() => {
        resetWalletList();
    }, [resetWalletList]);


    const onLoadMore = useCallback(() => {
        apiCallCallback(cursor);
    }, [apiCallCallback, cursor]);


    return [wallets, loading, error, onLoadMore, hasMore, resetWalletList];
}