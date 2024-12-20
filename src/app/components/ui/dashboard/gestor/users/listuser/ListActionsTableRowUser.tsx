import { UserInfo } from "@/app/types/UserInfo";
import { Button } from "../../layout/Buttons";
import { FormDeleteUser } from "./FormDeleteUser";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export async function ListActionsTableRowUser({ user, urlbase }: { user: UserInfo, urlbase: string }) {
    return (
        <div className="flex gap-2">

            <Button href={`${urlbase}/${user.id}/edit`}>Editar</Button>
            <FormDeleteUser id={user.id} />

            <Button href={`${urlbase}/${user.id}/permission`} icon={MdOutlineAdminPanelSettings}> Gerenciar permições </Button>

        </div>
    )
}