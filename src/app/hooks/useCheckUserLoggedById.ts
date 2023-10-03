'use client'

import { useUserCurrentLogged } from "../providers/ProviderUserCurrent"

interface useCheckUserLoggedByIdProps {
    userIdMatch: string
}

export default function useCheckUserLoggedById(data: useCheckUserLoggedByIdProps) {
    const session = useUserCurrentLogged();
    return session?.user.id == data.userIdMatch
}