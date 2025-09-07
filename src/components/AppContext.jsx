import { useContext, createContext, useState } from "react";

const AppContext = createContext();

function AppStateProvider({children}) {

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');
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

/**
 * @typedef {Object} AppState
 * @property {string} token - the jwt access token
 * @property {() => void} setToken - change jwt access token
 * @property {string} userName - userName
 * @property {() => void} setUserName - change userName
 * @property {string} userId - id
 * @property {() => void} setUserId - change usedId
 * @property {boolean} isAdmin - if the user is an admin
*/

/**
 * blogsites's app state
 * @returns {AppState}
*/
const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error('useAppContext can only be used inside AppContext');
    return context;
}

export {AppStateProvider, useAppContext};
