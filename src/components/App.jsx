import { useState } from "react";
import { Provider } from "react-redux";
import Auth from "../contexts/Auth";
import { hasAuthenticated } from "../services/AuthAPI";
import { store } from "../store/DataSlice";
import Check from "./Check";

export default function App(){

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated())

  return( 
  <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>  
    <Provider store={store}>
      <Check/>
    </Provider>
  </Auth.Provider>
)}

