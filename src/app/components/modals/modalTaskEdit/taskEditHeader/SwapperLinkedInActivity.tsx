"use client"

import { IoCloseCircle } from "react-icons/io5";

interface SwapperLoggedProps {
    rounded?: boolean,
    children: React.ReactNode
}

const SwapperLinkedInActivity: React.FC<SwapperLoggedProps> = ({ children, rounded = false }) => {
    return (
        <div className={`
            relative
            flex justify-center items-center
            p-[2px] bg-orange-400
            ${rounded ? "rounded-full" : ""}
        `}
        >
            <div className={`
                flex justify-center items-center
                p-[1px] bg-white
                ${rounded ? "rounded-full" : ""}
            `}>
                {children}
            </div>
            <div className="absolute bottom-0 right-0 bg-white text-red-500 rounded-full z-20">
                <IoCloseCircle />
            </div>
        </div>
    );
}

export default SwapperLinkedInActivity;
