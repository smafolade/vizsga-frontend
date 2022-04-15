import {Button} from "@mui/material";

export default function SubmitButton({field, form: {touched, errors, isSubmitting}, ...props}) {
    return (<Button {...field}
                    disabled={isSubmitting}
                    size={"large"}
                    type="submit" fullWidth variant={"outlined"}
                    {...props}>{props.label}</Button>);
};