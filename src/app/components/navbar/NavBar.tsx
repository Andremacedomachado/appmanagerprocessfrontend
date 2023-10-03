
import { UserInfo } from "@/app/types/UserInfo";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";


interface NavBarProps {
    currentUser?: UserInfo | null;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="
                    py-4
                    border-b-[1px]
                "
            >
                <div
                    className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        "
                >
                    <div className="mr-auto"></div>
                    <Search />
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

export default NavBar;