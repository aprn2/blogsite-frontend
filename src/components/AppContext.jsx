import { useContext, createContext, useState } from "react";
import { userCxtStore } from "../utils/store";

const user = userCxtStore.get();
const AppContext = createContext();

function AppStateProvider({children}) {

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(user?.userName);
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin);
    const [userId, setUserId] = useState(user?.userId);
    const [email, setEmail] = useState(user?.email);
    const [dob, setDob] = useState(user?.dob);

    return <AppContext.Provider
        value={{
            token,
            setToken,
            userName,
            setUserName,
            userId,
            setUserId,
            isAdmin,
            setIsAdmin,
            email,
            setEmail,
            dob,
            setDob
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
 * @property {() => void} setIsAdmin - if the user is an admin
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
