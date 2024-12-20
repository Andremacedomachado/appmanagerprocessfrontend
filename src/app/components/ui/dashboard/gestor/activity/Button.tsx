'use client'

import { usePathname } from "next/navigation"
import { Button } from "../layout/Buttons"
import { IconType } from "react-icons"

export function ButtonPushInfoUser({ id }: { id: string }) {
    const pathName = usePathname()
    return (
        <Button href={`${pathName}/${id}`}>Selecionar</Button>
    )
}

export function ButtonPushToPageSingleRecord({ id }: { id: string }) {
    const pathName = usePathname()
    return (
        <Button href={`${pathName}/${id}`}>Selecionar</Button>
    )
}

