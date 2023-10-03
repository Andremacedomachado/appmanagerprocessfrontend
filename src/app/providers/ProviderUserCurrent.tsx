'use client'

import { Session } from "next-auth";
import { ReactNode, createContext, useContext } from "react";

const UserCurrentContext = createContext<Session | undefined>(undefined);

interface ProviderUserCurrentContextProps {
    children: ReactNode,
    session: Session
}

export const ProviderUserCurrentContext: React.FC<ProviderUserCurrentContextProps> = ({ children, session }) => {
    return (
        <UserCurrentContext.Provider value={session} >
            {children}
        </UserCurrentContext.Provider>
    )
}

export const useUserCurrentLogged = () => {
    const data = useContext(UserCurrentContext)
    return data;
}