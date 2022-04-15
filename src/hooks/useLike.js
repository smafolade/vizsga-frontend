import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./useAuth";
import {AXIOS_METHOD, doApiCall} from "./useApi";
import {MODALS, useModals} from "./useModal";

function getLikedIdsFromSessionUser(sessionUser) {
    if (!sessionUser.likes) {
        return [];
    }
    return sessionUser.likes.map(e => e.id);
}

export default function useLike(walletId) {
    const {showModal} = useModals();
    const {sessionUser, authToken, setSessionUser} = useAuth();
    const likedIds = getLikedIdsFromSessionUser(sessionUser);
    const currentLiked = likedIds.includes(walletId);
    const [isLiked, setIsLiked] = useState(currentLiked);

    // handle like change from sessionUser
    useEffect(() => {
        setIsLiked(currentLiked);
    }, [walletId, currentLiked]);

    const onLikeChange = useCallback((onSuccessChange = false) => {
        if (authToken === false) {
            // show login modal
            showModal(MODALS.LOGIN);
            return;
        }
        // do api call
        doApiCall(AXIOS_METHOD.POST, isLiked ? '/unlike' : '/like',
            (newUserData) => {
                setSessionUser(newUserData);
                if (onSuccessChange !== false) {
                    onSuccessChange();
                }
            }, () => {
                setIsLiked(isLiked);
                showModal(MODALS.ERROR, {message: 'Like/unlike failed!'});
            }, {id: walletId});

        setIsLiked(oldLike => !oldLike);
    }, [authToken, isLiked, setSessionUser, setIsLiked, showModal, walletId]);

    return [isLiked, onLikeChange]
}