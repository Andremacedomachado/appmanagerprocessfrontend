'use client'
import { ImSpinner8 } from 'react-icons/im'
export default function LoadingDefault() {
    return (
        <div className='flex justify-center items-center w-screen h-[20vh] animate-spin text-orange-500'>
            <ImSpinner8 size={50}></ImSpinner8>
        </div>
    )
}