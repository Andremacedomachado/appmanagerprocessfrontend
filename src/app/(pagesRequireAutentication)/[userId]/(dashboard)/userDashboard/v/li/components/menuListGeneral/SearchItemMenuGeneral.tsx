'use client'
import { FiSearch } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";

interface SearchItemMenuGeneralProps<T extends Object = any> {
    value: T,
    onChange: (value: T) => void
    handleOptions: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SearchItemMenuGeneral: React.FC<SearchItemMenuGeneralProps> = ({ handleOptions, value, onChange }) => {
    return (
        <div className="flex flex-row justify-center items-center gap-2 px-2  bg-transparent ">
            <FiSearch size={12} />
            <input type="text" placeholder="Pesquizar..." value={value} onChange={onChange} className="appearance-none focus:outline-none cursor-text" />
            <div onClick={handleOptions} className="hover:bg-zinc-400/20 p-1 hover:rounded-md">
                <SlOptions size={14} />
            </div>
        </div>
    )
}

export default SearchItemMenuGeneral;