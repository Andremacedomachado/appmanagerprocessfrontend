import Link from "next/link"
import { signOut } from "../../../auth";

export interface MenuProps {
    children: React.ReactNode
}

export function Menu({ children }: MenuProps) {
    return (
        <div className="flex flex-col gap-2 divide-y-2 h-full overflow-hidden ">
            <div className="flex justify-end items-baseline gap-2 space-x-2  h-[8%] md:space-x-0 md:space-y-2 px-2">
                <div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button type="submit" className="flex   items-center justify-center gap-2 rounded-md bg-red-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
                <div className="flex w-20 rounded bg-red-500 justify-center items-center">
                    algo
                </div>
            </div>
            <div className="flex flex-col h-[92%]">
                {children}
            </div>
        </div>
    )
}