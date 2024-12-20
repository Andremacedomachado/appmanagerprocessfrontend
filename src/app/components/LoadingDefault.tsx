
import { ImSpinner8 } from 'react-icons/im'
export interface LoadingDefaultProps {
    size?: number
}

export default function LoadingDefault({ size = 50 }: LoadingDefaultProps) {
    return (
        <div role="status" className='flex justify-center items-center gap-1 text-orange-400' data-testid="load_default">
            <ImSpinner8 size={size} className='animate-spin' />
            <span className=" font-bold text-xs ">Loading...</span>
        </div>
    )
}