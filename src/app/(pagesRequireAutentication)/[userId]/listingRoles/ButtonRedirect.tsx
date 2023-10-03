'use client'


import Button from "../../../components/Button";
import { RoleFormatInUser } from "../../../types/UserInfo";
import Link from "next/link";

interface ButtonRedirectProps {
    roleinfo: RoleFormatInUser,
    urlBase: string | undefined
}
const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ roleinfo: role, urlBase }) => {

    const urlredirect = `${urlBase}/${role.roleName.toLowerCase()}Dashboard`
    return (
        <Link href={{
            pathname: urlredirect
        }}>
            <Button label={role.roleName} onClick={() => (console.log('click'))} />
        </Link>
    )
}

export default ButtonRedirect;