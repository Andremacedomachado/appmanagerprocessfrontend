"use client"

import MessageInfoContent from "@/app/components/popover/MessageInfoContent";
import { FC, HtmlHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge"

const Colors = {
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    green: 'bg-green-500',
    cyan: 'bg-cyan-500',
    fuchsia: 'bg-fuchsia-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500',
    indigo: 'bg-indigo-500',
    inherit: 'bg-inherit-500',
    pink: 'bg-pink-500',
    lime: 'bg-lime-500',
    neutral: 'bg-neutral-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    stone: 'bg-stone-500',
    rose: 'bg-rose-500',
    sky: 'bg-sky-500',
    slate: 'bg-slate-500',
    teal: 'bg-teal-500',
    violet: 'bg-violet-500',
    white: 'bg-white-500',
    yellow: 'bg-yellow-500',
    zinc: 'bg-zinc-500',
}

type ColorsKeyType = 'amber' | 'stone' | 'blue' | 'cyan' | 'emerald' | 'fuchsia' | 'gray' | 'green' | 'indigo' | 'lime' | 'neutral' | 'orange' | 'pink' | 'purple' | 'red' | 'rose' | 'sky' | 'slate' | 'stone' | 'teal' | 'violet' | 'white' | 'yellow' | 'zinc'

interface ButtonCirclePersonProps {
    fullName: string,
    classname?: HtmlHTMLAttributes<HTMLDivElement>['className'],
    size?: number,
    style?: HtmlHTMLAttributes<HTMLDivElement>['style']
    colorProfile?: ColorsKeyType,
    colorIndex?: number
}

const ButtonCirclePerson: FC<ButtonCirclePersonProps> = ({ fullName, classname, size = 10, style, colorProfile, colorIndex }) => {
    const [nameInitials, setNameInitials] = useState<string | undefined>('')
    const propsSize = `h-${size} w-${size}`
    /*  const colorCurrent = colorProfile ? Colors[colorProfile] : undefined
    console.log(propsSize); */

    const keys = Object.keys(Colors)
    const colorCurrent = colorIndex ? Colors[keys[colorIndex] as ColorsKeyType] : undefined
    useEffect(() => {
        console.log(fullName)
        if (fullName) {

            const initials = fullName.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase()
            setNameInitials(initials)
        }
    }, [fullName])

    return (
        <MessageInfoContent
            message={fullName}
            trigger={
                <div
                    data-testid='button-circle-person'
                    className={twMerge([`  relative flex justify-center items-center overflow-hidden rounded-full  p-1 cursor-pointer text-white bg-black h-10 w-10  hover:text-orange-600 hover:z-10 transition`, classname, colorCurrent, propsSize])}
                    style={style}
                >
                    <span>{nameInitials}</span>
                </div>
            }
        />
    );
}

export default ButtonCirclePerson;