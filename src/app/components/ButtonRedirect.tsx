'use client'
import { usePathname } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

interface ButtonRedirectProps {
    label: string
    endPoint: string
}

const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ label, endPoint }) => {
    const url = usePathname() + endPoint
    return (

        <Link href={{
            pathname: url
        }}>
            <Button
                label={label}
                onClick={() => { }}
            />
        </Link>

    );
}

export default ButtonRedirect;