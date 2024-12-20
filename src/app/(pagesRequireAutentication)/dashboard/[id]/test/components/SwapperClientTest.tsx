'use client'

import ModalTaskEdit from "@/app/components/modals/ModalTaskEdit";
import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import useUserInfoById from "@/app/hooks/consumeApiEndpoint/useUserInfoById";
import useCollaboratorsRecents from "@/app/hooks/useCollaboratorsRecents";
import { useCallback, useState } from "react";
import ButtonTest from "./ButtonTest";
import { useSession } from "next-auth/react";

interface SwapperClientTestProps {
    userId: string,
}

const SwapperClientTest: React.FC<SwapperClientTestProps> = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const session = useSession()
    const handlerAction = useCallback(() => {
        console.log('log', session);
        setIsOpen(!isOpen)
    }, [isOpen, session])


    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <ButtonTest onClick={handlerAction} />
            <ModalTaskEdit userId={userId} />
        </div>
    );
}

export default SwapperClientTest;