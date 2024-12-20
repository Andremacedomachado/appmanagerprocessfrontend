'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export function SearchTable({ search, fields }: { search?: string, fields: string[] }) {
    const router = useRouter()
    const url = usePathname()
    const initialRender = useRef(true)
    const [text, setText] = useState(search)
    const [fieldsInitialState, setfieldsInitialState] = useState(fields)
    const [query] = useDebounce(text, 750)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (query === '' || !query) {
            router.push(url)
        } else {

            const fieldParams = new URLSearchParams(fieldsInitialState.map(s => ['keys', s]))
            const valueParams = new URLSearchParams({ value: query })
            router.push(`${url}?${fieldParams}&${valueParams.toString()}`)
        }
    }, [query, url, router, fieldsInitialState])

    return (
        <div>

            <input
                value={text}
                placeholder='Buscar usuario...'
                onChange={e => setText(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
            />
        </div>

    )
}