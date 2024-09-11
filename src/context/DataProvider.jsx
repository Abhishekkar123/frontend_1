import { createContext,useState } from "react";

import { useEffect } from "react";
export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const [account, setAccount] = useState(() => localStorage.getItem('account') || '');

    useEffect(() => {
        // Update localStorage whenever the account state changes
        localStorage.setItem('account', account);
    }, [account]);
    return(
        <DataContext.Provider value={{
         account,
         setAccount
        }}>
    {children}
        </DataContext.Provider>
    )
}

export default DataProvider;