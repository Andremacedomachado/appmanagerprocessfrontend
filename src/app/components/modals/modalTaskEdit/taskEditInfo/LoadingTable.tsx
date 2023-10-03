
import SkeletonOverlay from "@/app/components/SkeletonOverlay"
import { twMerge } from "tailwind-merge"

interface LoadingTableProps {
    dimension?: React.HTMLProps<HTMLDivElement>['className']
}

const defaultstyle = "flex bg-slate-400/20 animate-pulse rounded-md"
const LoadingTable = ({ dimension = "my-2 mx-1 h-5 w-5/6" }: LoadingTableProps) => {
    return <SkeletonOverlay>
        <div className={twMerge(defaultstyle, dimension)}></div>
    </SkeletonOverlay>
}

export default LoadingTable;