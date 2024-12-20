
import { BsArrowRightShort } from "react-icons/bs";

interface PathProjectProps {
    pathfolders: string[]
}

const PathProject = ({ pathfolders }: PathProjectProps) => {
    return (
        <div className="flex flex-row justify-start rounded-md px-2 bg-slate-50  shadow-sm">
            {pathfolders.map((folder, index, path) => {
                if (path.length == index + 1) {
                    return <div key={index} className="hover:text-orange-600 hover:cursor-pointer">{folder}</div>
                }
                return <div key={index} className="flex flex-row items-center hover:text-orange-600 hover:cursor-pointer">
                    {folder}
                    <BsArrowRightShort size={20} />
                </div>
            })}
        </div>
    );
}

export default PathProject;