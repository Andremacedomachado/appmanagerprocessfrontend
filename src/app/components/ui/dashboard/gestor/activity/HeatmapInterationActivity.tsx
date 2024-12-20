
import { IMessageActivityProps } from "@/app/types/entities/MessageActivity";
import { format } from "date-fns";
import { CalendarInterationWithSearchFilter } from "./CalendarInterationWithSearchFilter";


export function HeatmapInterationActivity({ messages }: { messages: IMessageActivityProps[] }) {
    const messagesParsed = parseMessageActivityToInterationPerDay(messages)

    return (
        <CalendarInterationWithSearchFilter data={messagesParsed} />
    )
}

export function parseMessageActivityToInterationPerDay(messages: IMessageActivityProps[]) {
    const duplicates = messages.map(({ publication_date }) => format(publication_date, 'yyyy-MM-dd'))
    const numOfDuplicates = duplicates.reduce((count, current) =>
        (count[current] = count[current] + 1 || 1, count), {} as Record<string, number>)
    return Object.entries(numOfDuplicates).map((item) => ({ day: item[0], value: item[1] }))
}
