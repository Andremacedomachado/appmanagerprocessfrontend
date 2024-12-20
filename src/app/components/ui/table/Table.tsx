
export interface TableProps {
    contentsBody?: React.ReactNode[][],
    contentsHead: React.ReactNode[][]
}

export function Table({ contentsBody, contentsHead }: TableProps) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {contentsHead.map((contentsInLine, index) => (
                        <TableHeaderRow key={`th-${index}`} contentsInHeader={contentsInLine} />
                    ))}
                </thead>
                <tbody>

                    {contentsBody && contentsBody.map((contentsInLine, index) => (
                        <TableBodyRow key={`tb-${index}`} contentsInLine={contentsInLine} />
                    ))}
                </tbody>


            </table>
            {(!contentsBody || contentsBody?.length == 0) &&
                <div className="w-full flex justify-center items-center p-2 text-gray-500">
                    Sem dados na tabela
                </div>
            }
        </div>
    )
}

export interface TableBodyRowProps {
    contentsInLine: Array<React.ReactNode>
}

export function TableBodyRow({ contentsInLine }: TableBodyRowProps) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {contentsInLine.map((content, index) => (
                <td key={`tbc-${index}`} className="px-6 py-4 truncate">
                    {content}
                </td>
            ))}
        </tr>
    )
}


export interface TableHeaderRowProps {
    contentsInHeader: React.ReactNode[]
}

export function TableHeaderRow({ contentsInHeader }: TableHeaderRowProps) {
    return (
        <tr>
            {contentsInHeader.map((content, index) => (
                <th key={`thc-${index}`} scope="col" className="px-6 py-3" >
                    {content}
                </th>
            ))}
        </tr>
    )
}