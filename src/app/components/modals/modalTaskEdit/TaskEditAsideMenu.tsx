

import { ReactNode } from "react";

const TasckEditAsideMenu = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="flex flex-row border-b-[1px] border-[#dcdfe4] p-1 overflow-hidden w-full h-[8vh]"
        >
            {children}
        </div>
    );
}

export default TasckEditAsideMenu;