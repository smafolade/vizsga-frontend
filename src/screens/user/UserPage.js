import {Button, Grid, LinearProgress, Typography} from "@mui/material";
import OneWallet from "../../components/OneWallet";
import {useNavigate, useParams} from "react-router-dom";
import {AXIOS_METHOD, useApi} from "../../hooks/useApi";
import useWallets from "../../hooks/useWallets";

export default function UserPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [authorData, loadingAuthor, errorAuthor] = useApi(AXIOS_METHOD.GET, `/user/${id}`);
    const [wallets, loadingWallets, errorWallets, onMore, hasMore] = useWallets(4);

    if ((loadingWallets === false && errorWallets !== false) ||
        (loadingAuthor === false && errorAuthor !== false)) {
        navigate('/500');
        return null;
    }

    return (<><Grid container spacing={2}>
        <Grid item xs={12}>
            {loadingAuthor === false && authorData !== false &&
                <Typography variant={"h6"}>Wallets by {authorData?.name}:</Typography>
            }
        </Grid>
        {loadingWallets === false && wallets && wallets.map(item => {
            return (<OneWallet key={item?.id} id={item?.id}
                                   description={item?.description}
                                   title={item?.title}
                                   isLocked={item?.isLocked}
            />);
        })}
        <br/>
        {loadingWallets === true && <Grid item xs={12}>
            <LinearProgress/>
        </Grid>}
        <Grid item xs={12}>
            {hasMore && !loadingWallets && <Button onClick={onMore} fullWidth>Load more</Button>}
        </Grid>
    </Grid></>)
}