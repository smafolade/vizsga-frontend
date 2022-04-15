import {Dialog, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {Form, Formik, Field, ErrorMessage} from "formik";
import {TextField, CheckboxWithLabel} from 'formik-mui'
import SubmitButton from "../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";
import {useAuth} from "../hooks/useAuth";
import React from 'react';

function validateRegFormValues(values) {
    const errors = {};
    if (values.password !== values.password2) {
        errors['password2'] = 'The two passwords are different!';
    }
    return errors;
}

function validateUsername(name) {
    const NAME_REGEX = /^[0-9a-zA-Z]*$/g;
    if (name.length < 3) {
        return 'Name should be at least 3 characters!';
    }
    if (NAME_REGEX.test(name) === false) {
        return 'Name can only include numbers, upper and lowercase characters!';
    }
}

export default function RegModal({onClose}) {
    const {handleLoginResult} = useAuth();
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
            <br/>
            <Formik initialValues={{legal: false, name: '', password: '', password2: ''}}
                    validate={validateRegFormValues}
                    onSubmit={(value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        const onFailure = (apiError) => {
                            setFieldError('name', apiError);
                            setSubmitting(false);
                        };

                        doApiCall(AXIOS_METHOD.POST, '/reg', (_unusedRegData) => {
                            doApiCall(AXIOS_METHOD.POST, '/login', (data) => {
                                handleLoginResult(data);
                                setSubmitting(false);
                                onClose();
                            }, onFailure, value);
                        }, onFailure, value);
                    }}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field component={TextField} name="name" label="Username" type="text"
                                   validate={validateUsername} style ={{width: '100%'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name="password" label="Password" type="password" style ={{width: '100%'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name="password2" label="Password again" type="password" style ={{width: '100%'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="legal"
                                Label={{label: 'Legal stuff'}}
                                validate={value => value === false && 'Legal stuff accept required!'}
                            />
                            <Typography variant={"body2"} color={"error"}>
                                <ErrorMessage name={"legal"}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={SubmitButton} label={"Do the registration"}/>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </DialogContent>
    </Dialog>)
}