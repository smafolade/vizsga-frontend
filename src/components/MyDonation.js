import {Card, CardContent, Grid, Typography} from "@mui/material";

function formatDate(dateString) {
    let date = new Date(dateString).toLocaleDateString()
    let time = new Date(dateString).toLocaleTimeString();
    return date+' '+time;
}

export default function MyDonation({id, name, created_at, amount}) {

    return (<Grid item xs={12} md={4} lg={3}>
        <Card key={id}>
            <CardContent>
                <Typography variant={"h4"}>
                    {name}
                </Typography>
                <Typography variant={"body1"}>
                    Donated date: <br/>
                    {formatDate(created_at)}
                </Typography>
                <Typography variant={"body1"} fontWeight={'bold'}>
                    Donated: {amount} $
                </Typography>
            </CardContent>
        </Card>
    </Grid>);
}