'use client'
import { usePathname } from "next/navigation";
import { RoleFormatInUser } from "../../../types/UserInfo"
import ButtonRedirect from "./ButtonRedirect";

interface ListingRolesProps {
    roles: RoleFormatInUser[];
}

interface RoleRedirect {
    roleName: string
}
const ListingRoles: React.FC<ListingRolesProps> = ({ roles }) => {
    const url = usePathname()?.split('/listingRole')[0]

    return (
        <div className="pt-2 flex flex-col gap-3">
            {roles.map(role => (
                <div key={role.roleId}>
                    <ButtonRedirect roleinfo={role} urlBase={url} />
                </div>
            ))}
        </div>
    )
}

export default ListingRoles;