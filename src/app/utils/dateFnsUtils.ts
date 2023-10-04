'use client'

import { format, parseISO } from "date-fns"

export function parseDateToMaskDate(dateOrigin: Date) {
    return format(parseISO(dateOrigin.toString()), 'dd MMM yyyy');
}