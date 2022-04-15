import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function AddWallet() {
    const navigate = useNavigate();
    return (<Grid item xs={12}>
        <Button variant={"outlined"} fullWidth onClick={() => {
            navigate('/new');
        }}>Add new wallet</Button>
    </Grid>);
}