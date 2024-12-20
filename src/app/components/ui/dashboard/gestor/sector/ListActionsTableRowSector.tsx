'use client'
import { ISectorProps } from "@/app/types/entities/Sector"
import { Button } from "../layout/Buttons"
import { usePathname } from "next/navigation"
import { FormDeleteSector } from "./FormDeleteSector"

export interface ListActionsTableRowSectorProps {
    sector: ISectorProps,

}

export function ListActionsTableRowSector({ sector }: ListActionsTableRowSectorProps) {
    const urlbase = usePathname()
    return (
        <div className="flex gap-2">
            <Button href={`${urlbase}/${sector.id}/edit`}>Editar</Button>
            <FormDeleteSector id={sector.id} />
        </div>
    )
}