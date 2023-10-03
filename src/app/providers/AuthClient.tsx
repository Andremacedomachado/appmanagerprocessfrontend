'use client'

import { useSession } from "next-auth/react";
import { ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import LoadingDefault from "../components/LoadingDefault";
import { ProviderUserCurrentContext } from "./ProviderUserCurrent";
import useLoginModal from "../hooks/useLoginModal";
import LoginModal from "../components/modals/LoginModal";

interface AuthClientProps {
    children: ReactNode
}



const AuthClient = ({ children }: AuthClientProps) => {
    const router = useRouter()
    const { data, status, update } = useSession()
    const { onOpen } = useLoginModal()

    const handlerOpenModal = useCallback(() => {
        onOpen()
    }, [onOpen])
    if (status == 'unauthenticated') {

        return <div className="h-full w-full flex flex-col justify-center items-center">
            <button type="button" onClick={handlerOpenModal}>
                Login
            </button>
            <LoginModal />
        </div>
    }

    if (status == 'authenticated' && data) {
        return <ProviderUserCurrentContext session={data}>
            {children}
        </ProviderUserCurrentContext>

    }

    return (

        <div className="flex flex-col justify-center items-center">
            <div>carregando...</div>
            <LoadingDefault />
        </div>
    )
}

export default AuthClient;