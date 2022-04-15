import {Routes, Route, Navigate} from "react-router-dom";
import {Container} from "@mui/material";
import * as React from 'react';
import CharityWallets from "./CharityWallets";
import DetailPage from "./screens/detail/DetailPage";
import Me from "./screens/me/Me";
import Page404 from "./screens/404/Page404";
import DonateScreen from "./screens/donate/DonateScreen";
import SendScreen from "./screens/send/SendScreen";
import NewWalletScreen from "./screens/new/NewWalletScreen";
import AppMenu from './components/AppMenu';
import Providers from "./Providers";
import { useAuth } from "./hooks/useAuth";

function ProtectedPage({children}) {
  const {authToken} = useAuth();
  if (authToken === false) {
      return <Navigate to="/"></Navigate>;
  }

  return children;
}


function App() {
  return (
    <Providers>
      <AppMenu />
      <br/>
      <Container maxWidth={"lg"}>
        <Routes>
          <Route path= "/" exact element={<CharityWallets />}/>
          <Route path= "/me" exact element={<ProtectedPage><Me/></ProtectedPage>}/>
          <Route path= "/new" exact element={<ProtectedPage><NewWalletScreen/></ProtectedPage>}/>
          <Route path= "/transaction/:id" exact element={<ProtectedPage><DonateScreen/></ProtectedPage>}/>
          <Route path= "/send/:id" exact element={<SendScreen/>} />
          <Route path= "/wallet/:id" exact element={<DetailPage/>}/>
          <Route path= "*" exact element={<Page404/>}/>
        </Routes>
      </Container>
    </Providers>
  );
}

export default App;
