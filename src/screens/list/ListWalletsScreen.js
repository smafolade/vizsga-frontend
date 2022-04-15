import {Button, Grid, LinearProgress} from "@mui/material";
import OneWallet from "../../components/OneWallet";
import AddWallet from "../../components/AddWallet";
import {useNavigate} from "react-router-dom";
import useWallets from "../../hooks/useWallets";
import {useAuth} from "../../hooks/useAuth";

export default function ListPage({uri}) {
    const navigate = useNavigate();
    const [wallets, loading, error, onMore, hasMore] = useWallets(4, uri);
    const {sessionUser} = useAuth();

    if (loading === false && error !== false) {
        navigate('/500');
        return null;
    }

    return (<>
        {sessionUser.admin ? (<AddWallet />) : ''} 
        <br/>
        <Grid container spacing={2}>
            {wallets && wallets.map(item => {
                return (<OneWallet key={item?.id} id={item?.id}
                                    description={item?.description}
                                    name={item?.name}
                                    balance={item?.balance}
                                    isLocked={item?.isLocked}
                />);
            })}  
            {wallets == false && <Grid>Meg nem adomanyoztal. </Grid>}    
            {loading === true && <Grid item xs={12}>
                <LinearProgress/>
            </Grid>}
            <Grid item xs={12}>
                {hasMore && !loading && <Button onClick={onMore} fullWidth>Load more</Button>}
            </Grid>
        </Grid>
    </>)
}