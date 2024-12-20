'use client'

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
export interface ButonBackProps extends Omit<LinkProps, 'href'> {
    className?: React.HTMLAttributes<HTMLElement>['className'],
    children: ReactNode
}

const defaultStyle = "p-2 bg-orange-400 text-white font-semibold rounded hover:bg-orange-600"

export function ButtonBack({ children, className = defaultStyle, ...props }: ButonBackProps) {
    const router = usePathname()
    const finalSlashIndex = router.lastIndexOf('/')
    const previousPath = router.slice(0, finalSlashIndex)
    return <Link className={className} {...props} href={previousPath}>{children}</Link>
}