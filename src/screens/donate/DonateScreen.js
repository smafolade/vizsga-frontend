import {Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from 'formik-mui'
import SubmitButton from "../../components/SubmitButton";
import {AXIOS_METHOD, doApiCall, useApi} from "../../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";
import {FaDollarSign} from 'react-icons/fa';
import {MODALS, useModals} from "../../hooks/useModal";
import * as Yup from "yup"

function validateAmount(amount) {
    const errors = {};
    if (amount < 0) {
        return 'Negative amount not valid!';
    }
}

const AmountCheck = Yup.object().shape({
    amount: Yup.string()
        .min(1, 'Too Short!')
        .required('Amount is required'),
});


export default function DonateScreen() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [wallet, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    const {showModal} = useModals();
    
    return (<>
        <Typography variant={"h2"}>Donate to {wallet?.name}</Typography>
        <br/>
        <Formik initialValues={{amount: 100}} 
                    onSubmit={(value, {setFieldError, setSubmitting}) => {                  
                        setSubmitting(true);
                        
                        doApiCall(AXIOS_METHOD.PUT, `/transaction/${id}`, (_unusedNewSuggestion) => {
                            setSubmitting(false);
                            navigate(`/`);
                        }, (apiError) => {
                            setFieldError('name', apiError);
                            setSubmitting(false);
                        }, value);
                        showModal(MODALS.CONFIRM, {
                            title: "You have donated",
                            message: "Thank you!",
                        })
                }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant={"h3"}><FaDollarSign/></Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Field component={TextField} name="amount" label="Amount" type="number" validate={validateAmount} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={SubmitButton} label={"Donate"} color="success" />
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </>)
};