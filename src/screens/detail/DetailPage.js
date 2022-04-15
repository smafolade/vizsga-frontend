import {Button, Grid, Typography, Chip} from "@mui/material";
import UserList from './components/UserList'
import {useNavigate, useParams} from "react-router-dom";
import {AXIOS_METHOD, useApi} from "../../hooks/useApi";
import LoadingBlock from "../../components/LoadingBlock";
import useLike from "../../hooks/useLike";
import {useAuth} from "../../hooks/useAuth";
import {MODALS, useModals} from "../../hooks/useModal";


export default function DetailPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLiked, onChangeLike] = useLike(id);
    const [wallet, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    const [transactions] = useApi(AXIOS_METHOD.POST, `/transactions/${id}`);
    const {showModal} = useModals();
    const {sessionUser, authToken} = useAuth();

    function onDonate() {
        if (authToken === false) {
            // show login modal
            showModal(MODALS.LOGIN);
            return;
        } else {
            navigate(`/transaction/${id}`);  
        } 
    }

    if (loading === false && error !== false) {
        navigate('/404');
        return null;
    }

    if (loading === true && wallet === false) {
        return <LoadingBlock/>;
    }

    return (<Grid container spacing={2}>
        <br/>
        <Grid item xs={10}>
            <Typography variant={"h4"}>{wallet?.name}</Typography>
        </Grid>
        
        <Grid item xs={12}>
            {wallet?.description.split("\n").map((line, i) => {
                return <Typography variant={"body1"} key={i}>{line}</Typography>
            })}
        </Grid>
        <Grid item xs={12}>
            <Typography variant={"body1"}>Donated: {wallet?.balance} $</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant={"button"}>Donors:</Typography>{" "}
            {transactions.transactions?.map(transaction => {
                return (<Chip variant="outlined"
                              key={transaction?.id} label={transaction?.created_by.name}
                              />)
            })}
            
        </Grid>
        { wallet?.isLocked  ? '' :
            <Grid item xs={12}>
                <Button variant={"outlined"} onClick={() => onDonate()} fullWidth>Go to donation page</Button>
            </Grid>
        }
    </Grid>)
}