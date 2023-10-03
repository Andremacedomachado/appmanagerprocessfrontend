'use client'

import { useState, useCallback } from "react"

export default function useToggle(initialValue = true) {
    const [state, setState] = useState(initialValue)

    const toggleState = useCallback(() => {
        setState(!state)
    }, [state])

    return {
        state,
        toggleState
    }
}