import { useContext, createContext, useState } from "react";

const AppContext = createContext();

function AppStateProvider({children}) {

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('fucker');
    const [isAdmin, setIsAdmin] = useState(null);
    const [userId, setUserId] = useState(null);

    return <AppContext.Provider
        value={{
            token,
            setToken,
            userName,
            setUserName,
            userId,
            setUserId,
            isAdmin,
            setIsAdmin
        }}
    > 
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error('useAppContext can only be used inside AppContext');
    return context;
}

export {AppStateProvider, useAppContext};
