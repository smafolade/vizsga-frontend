import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./useAuth";
import {AXIOS_METHOD, doApiCall} from "./useApi";
import {MODALS, useModals} from "./useModal";
import {useNavigate} from "react-router-dom";
import useWallets from "../hooks/useWallets";

function getLockedIdsFromSessionUser(sessionUser) {
    if (!sessionUser.closed) {
        return [];
    }
    return sessionUser.closed.map(e => e.id);
}

export default function useLock(walletId) {
    const navigate = useNavigate()
    const {showModal} = useModals();
    const {sessionUser, authToken, setSessionUser} = useAuth();
    const lockIds = getLockedIdsFromSessionUser(sessionUser);
    const currentLocked = lockIds.includes(walletId);
    const [closed, setIsLocked] = useState(currentLocked);

    // handle like change from sessionUser
    useEffect(() => {
        setIsLocked(currentLocked);
    }, [walletId, currentLocked]);

    const onLockChange = useCallback((onSuccessChange = false) => {
        if (authToken === false) {
            // show login modal
            showModal(MODALS.LOGIN);
            return;
        }

        // do api call
        //(AXIOS_METHOD.GET, `/wallet/${id}`);
        doApiCall(AXIOS_METHOD.POST,  `/closewallet/${walletId}`,(_unusedNewSuggestion) => {
            setIsLocked(1);
        }, (apiError) => {
                //setClosed(closed);
                //showModal(MODALS.ERROR, {message: 'Lock failed!'});
        }, () => {
            setIsLocked(0);
            showModal(MODALS.ERROR, {message: 'Failed!'});
        }, {id: walletId});
        showModal(MODALS.CONFIRM, {
            title: "Wallet closed.",
            message: "Wallet closed.",
        })
        setIsLocked(1);
    }, [authToken, closed, setSessionUser, setIsLocked, showModal, walletId]);

    return [closed, onLockChange]
}