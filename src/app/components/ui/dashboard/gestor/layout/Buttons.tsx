import Link from "next/link";
import { IconType } from "react-icons";

export interface ButtonProps {
    href: string,
    children: React.ReactNode,
    className?: string,
    icon?: IconType
    iconSize?: string | number
}
const defaultStyle = "flex items-center justify-center md:justify-start gap-1 p-2 bg-orange-400 rounded-md text-white font-semibold hover:bg-orange-600 w-auto  transation duration-300 "
export function Button({ children, href, className = defaultStyle, icon: Icon, iconSize = 20 }: ButtonProps) {
    return <Link href={href} className={className}>
        <div>
            {Icon && <Icon size={iconSize} />}
        </div>
        <div className="hidden md:block truncate ...">

            {children}
        </div>
    </Link>
}