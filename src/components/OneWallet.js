import {Button, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {Favorite, FavoriteBorder, Delete} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import useLike from "../hooks/useLike";
import useLock from "../hooks/useLock";
import {FaMoneyBill, FaShareAlt, FaLock, FaLockOpen} from 'react-icons/fa';
import {useAuth} from "../hooks/useAuth";
import {MODALS, useModals} from "../hooks/useModal";


export default function OneWallet({id, name, description, balance, isLocked }) {
    const navigate = useNavigate();
    const {showModal} = useModals();
    const {sessionUser, authToken} = useAuth();
    const [closed, onChangeLock] = useLock(id);
    

    function onDonate() {
        if (authToken === false) {
            // show login modal
            showModal(MODALS.LOGIN);
            return;
        } else {
            navigate(`/transaction/${id}`);  
        } 
    }

    return (<Grid item xs={12} md={4} lg={3}>
        <Card >
            <CardContent style={{minHeight: '200px'}}>
                <Typography variant={"h4"}>
                    {name}
                </Typography>
                <Typography variant={"body1"}>
                    {description}<br/>
                    Donated: {balance} $<br/>
                </Typography>
            </CardContent>
            <CardActions>            
            <Button size="small" variant={"outlined"} fullWidth onClick={() => {
                navigate(`/wallet/${id}`);
            }}>Details</Button>
            {sessionUser.admin ? (<IconButton onClick={() => onChangeLock()}> {closed || isLocked ? <FaLock/> : <FaLockOpen/>}</IconButton>) : ''}
            { closed || isLocked  ? <div /> :
                <Tooltip title="Donate"> 
                    <IconButton onClick={() => onDonate()} >
                        <FaMoneyBill tip="Donate"/>
                    </IconButton>
                </Tooltip> 
            } 
            { closed || isLocked  ? <div /> :
                <Tooltip title="Share wallet">
                    <IconButton onClick={() => {navigate(`/send/${id}`) }} >
                        <FaShareAlt/>
                    </IconButton>
                </Tooltip>     
            }        
            </CardActions>
        </Card>
    </Grid>);
}