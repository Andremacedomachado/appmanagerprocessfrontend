'use client';
import { BiSearch } from 'react-icons/bi'
const Search = () => {
    return (
        <div
            className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                "
            >
                <div
                    className="
                        text-sm
                        font-semibold
                        px-6
                    "
                >
                    algo
                </div>
                <div
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        text-center
                    "
                >
                    any week
                </div>
                <div
                    className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            hidden 
                            sm:block
                        "
                    >
                        adicionado algo
                    </div>
                    <div
                        className="
                            p-2
                            bg-orange-400
                            rounded-full
                            text-white
                        "
                    >
                        <BiSearch size={18} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Search;