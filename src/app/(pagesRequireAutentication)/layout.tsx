
import { redirect } from "next/navigation";
import AuthClient from "../providers/AuthClient";
import { Menu } from "../components/Menu";

interface PrivateLayoutProps {
    children: React.ReactNode
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {

    return <Menu>{children}</Menu>

}

export default PrivateLayout;