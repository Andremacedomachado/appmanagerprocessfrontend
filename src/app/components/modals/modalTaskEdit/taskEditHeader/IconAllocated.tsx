"use client"

import { BiRefresh } from "react-icons/bi";

interface IconAllocatedProps {
    size: number
}

const IconAllocated: React.FC<IconAllocatedProps> = ({ size }) => {
    return (
        <div className="p-1 rounded-md bg-white group-hover:block hidden">
            <BiRefresh size={size} />
        </div>
    );
}

export default IconAllocated;