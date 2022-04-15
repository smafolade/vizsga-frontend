import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function ConfirmModal({onClose, title, message}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography variant={"body1"}>
                {message}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant={"outlined"} onClick={onClose}>OK</Button>
        </DialogActions>
    </Dialog>)
}