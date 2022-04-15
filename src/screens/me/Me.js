import {Button, Grid, LinearProgress, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AXIOS_METHOD, doApiCall, useApi} from "../../hooks/useApi";
import {useAuth} from "../../hooks/useAuth";
import {MODALS, useModals} from "../../hooks/useModal";
import useWallets from "../../hooks/useWallets";
import MyDonation from "../../components/MyDonation";


export default function MePage() {
    const navigate = useNavigate();
    const {showModal} = useModals();
    const {sessionUser} = useAuth();
    const [wallets, loading, error, onMore, hasMore, refreshWallets] = useWallets(4, '/wallets');
    const [transactions] = useApi(AXIOS_METHOD.GET, `/transactionsbyuid`);
    
    if (loading === false && error !== false) {
        navigate('/500');
        return null;
    }

    return (<>
        <Grid container spacing={2}>
        {transactions && transactions.transactions.map(item => {
            return (<MyDonation key={item?.id} id={item?.id}
                name={item?.name}
                created_at={item?.created_at}
                amount={item?.amount}
                />
            );
        })}  
        </Grid>
        {transactions == false && <Grid>Meg nem adomanyoztal. </Grid>}   
    </>)
}