import {Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from 'formik-mui'
import SubmitButton from "../../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../../hooks/useApi";
import {useNavigate} from "react-router-dom";

function validateName(name) {
    if (name === ''){
        return 'There should be title!';
    }
    if (name.length > 80){
        return 'Maximum length of the title should be 80 characters!';
    }
}

function validateDescription(description){
    if (description === ''){
        return 'Wallet needs description!';
    }
}


export default function NewWalletScreen() {
    const navigate = useNavigate()
    
    return (<>
        <Typography variant={"h2"}>Add new wallet</Typography>
        <br/>
        <Formik initialValues={{name: '', description: ''}} onSubmit={(value, {setFieldError, setSubmitting}) => {
            setSubmitting(true);
            doApiCall(AXIOS_METHOD.PUT, '/wallet', (_unusedNewSuggestion) => {
                setSubmitting(false);
                navigate('/');
            }, (apiError) => {
                setFieldError('name', apiError);
                setSubmitting(false);
            }, value);
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" label="Name" type="text" fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="description" label="Description"
                               type="text" multiline fullWidth minRows={8} />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={SubmitButton} label={"Create wallet"}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </>)
};