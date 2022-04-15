import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {AuthContextProvider} from "./hooks/useAuth";
import {ModalContextProvider} from "./hooks/useModal";

const theme = createTheme({});

export default function Providers({children}) {
    return (<ThemeProvider theme={theme}>
        <AuthContextProvider>
            <ModalContextProvider>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </ModalContextProvider>
        </AuthContextProvider>
    </ThemeProvider>)
}