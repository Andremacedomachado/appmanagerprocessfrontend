"use client"

import { SlOptions } from "react-icons/sl";

interface ButtonOptionInfoProps {
    onClick: () => void,
    size?: number

}
const ButtonOptionInfo: React.FC<ButtonOptionInfoProps> = ({ onClick, size = 10 }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center h-full hover:text-orange-700 "
        >
            <SlOptions size={size} />
        </div>
    );
}

export default ButtonOptionInfo;