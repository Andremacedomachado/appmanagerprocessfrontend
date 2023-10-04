import Container from "@/app/components/Container";
import LoadingDefault from "@/app/components/LoadingDefault";
import { ImSpinner8 } from "react-icons/im";

export default function Loading() {
    return (
        <div
            className="
                max-w-[2520px]
                mx-auto
                xl:px-20
                md:px-10
                sm:px-2
                px-4
            "
        >
            <div
                className="p-2 bg-transparent bg-opacity-10 shadow-md animate-pulse space-y-2"
            >
                <div className="space-y-2">

                    <div className="h-7 w-1/3 bg-slate-400 rounded "></div>
                    <div className="h-5 w-3/5 bg-slate-400 rounded "></div>
                </div>
                <div className="p-4 flex flex-col gap-3">
                    {[1, 2, 3].map((num, index) => {
                        return (
                            <div key={index} className='flex justify-start items-center w-auto h-auto  text-slate-500'>
                                <ImSpinner8 size={24} className="animate-spin"></ImSpinner8>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>

    )
}