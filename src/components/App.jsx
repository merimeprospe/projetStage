import { useState } from "react";
import { Provider } from "react-redux";
import Auth from "../contexts/Auth";
import { hasAuthenticated } from "../services/AuthAPI";
import { store, persistor} from "../store/store";
import Check from "./Check";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function App(){

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated())

  return( 
  <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>  
    <Provider store={store}>
     <PersistGate persistor={persistor}>
    <Check/>
    </PersistGate> 
    </Provider>
  </Auth.Provider>
)}

