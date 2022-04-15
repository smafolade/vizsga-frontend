import {Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from 'formik-mui'
import SubmitButton from "../../components/SubmitButton";
import {AXIOS_METHOD, doApiCall, useApi} from "../../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";
import {FaEnvelope} from 'react-icons/fa';
import * as Yup from "yup"
import {useAuth} from "../../hooks/useAuth";
import {MODALS, useModals} from "../../hooks/useModal";

const SignupSchema = Yup.object().shape({
    subject: Yup.string()
        .min(3, 'Too Short!')
        .max(80, 'Too Long!')
        .required('Subject is required'),
    
    desc: Yup.string()
        .min(20, 'Too Short!')
        .required('Description is required'),
    
    email: Yup.string().email('Invalid email').required('Required'),
});


export default function SendScreen() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [wallet, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    const {showModal} = useModals();
    const {sessionUser} = useAuth();

    function onSend(id) {
        showModal(MODALS.CONFIRM, {
            title: "Email is sent to your friend",
            message: "Thank you!",
        })
        navigate('/');
    }
    
    
    return (<>
        <Typography variant={"h2"}>Send {wallet?.name} to: </Typography>
        <br/>
        <Formik initialValues={{email: ''}} 
                    validationSchema={SignupSchema}
                    onSubmit={(value, {setFieldError, setSubmitting})=>{
                        setSubmitting(true);
                navigate('/');
        }}>
             <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <Typography variant={"h3"}><FaEnvelope/></Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <Field component={TextField} name={"email"} label={"email cim"} type={"text"} autoComplete={"on"} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name={"subject"} label={"Subject"} type={"text"} value={`Charity ${wallet?.name}`} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name={"desc"} label="Description" type="text" value={'Check this charity! Please donate!'}
                            multiline fullWidth minRows={3} />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={SubmitButton} label={"Send email"} onClick={() => onSend({id})} />
                        </Grid>
                    </Grid>
                </Form>
        </Formik>
    </>)
};