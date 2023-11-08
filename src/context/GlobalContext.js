import {createContext, useState} from 'react';
export const GlobalContext = createContext()

export const ContextProvider = (props) => {
    const [auth, setAuth] = useState({});
    const [clientContext, setClientContext] = useState([])
    return (
      <GlobalContext.Provider value={{
        auth,
         setAuth,
         clientContext, 
         setClientContext}}
       >
        {props.children}
      </GlobalContext.Provider>
    )
}


export default ContextProvider;