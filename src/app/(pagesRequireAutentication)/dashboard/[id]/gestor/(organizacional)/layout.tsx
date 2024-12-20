import { Button } from "@/app/components/ui/dashboard/gestor/layout/Buttons"
import { GoOrganization } from "react-icons/go"

export interface LayoutOrganizationProps {
    children: React.ReactNode,
    params: {
        id: string
    }
}

export default function LayoutOrganization({ children, params: { id } }: LayoutOrganizationProps) {
    return (
        <div className="w-full h-full flex flex-col divide-y-2">
            <div className="p-3 gap-1 flex ">
                <Button href={`/dashboard/${id}/gestor/organization`} icon={GoOrganization}>Organizaçoes</Button>
                <Button href={`/dashboard/${id}/gestor/sector`} icon={GoOrganization}>Setores</Button>
            </div>
            <div className="py-2 flex overflow-y-auto">
                {children}
            </div>
        </div>
    )
}