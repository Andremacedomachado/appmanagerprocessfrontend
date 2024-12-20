import { Button } from "@/app/components/ui/dashboard/gestor/layout/Buttons";
import { IoBarChartOutline, IoPeopleOutline } from 'react-icons/io5';
import { GoOrganization } from "react-icons/go";

export default function LayoutManager({ children, params: { id } }: { children: React.ReactNode, params: { id: string } }) {


    return <div className="flex divide-x-2 h-full  ">
        <div className="flex flex-col  gap-1 p-2 w-2/12 h-full ">
            <div className="flex flex-1"></div>
            <Button href={`/dashboard/${id}/gestor/activity`} icon={IoBarChartOutline}>Monitorar Atividades</Button>
            <Button href={`/dashboard/${id}/gestor/organization`} icon={GoOrganization}>Setores</Button>
            <Button href={`/dashboard/${id}/gestor/users`} icon={IoPeopleOutline}>Cadastros / Usuarios</Button>

        </div>
        <div className="flex p-2 h-full w-full overflow-auto "> {children}</div>
    </div>
}