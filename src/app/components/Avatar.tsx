'use client'
import Image from "next/image"

const Avatar = ({ size = 30, src = '/images/placeholder.jpg' }: { size?: number, src?: string }) => {
    return (
        <Image
            height={size}
            width={size}
            alt="avatar"
            src={src}
        />
    )
}

export default Avatar;