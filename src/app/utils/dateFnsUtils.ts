
import { format, parseISO } from "date-fns"

export function parseDateToMaskDate(dateOrigin: Date | string) {
    let dateParsed: Date;
    if (dateOrigin instanceof Date) {
        dateParsed = dateOrigin

    }
    else {
        dateParsed = parseISO(dateOrigin.toString())
    }

    return format(dateParsed, 'dd MMM yyyy')
}