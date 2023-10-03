'use client'

import { useState } from "react"

export function useLoading(initialValue: boolean = true) {
    const [isLoanding, setIsloanding] = useState(initialValue)

    return {
        isLoanding: isLoanding,
        setLoaded: () => setIsloanding(false),
        setLoanding: () => setIsloanding(true)
    }
}