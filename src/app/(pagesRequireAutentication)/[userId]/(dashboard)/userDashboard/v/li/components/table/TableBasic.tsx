'use client'

import { ActivityInfo } from "@/app/types/CollectionActivityTree";
import { useReactTable, getCoreRowModel, flexRender, ColumnOrderState, ColumnDef, ColumnResizeMode } from "@tanstack/react-table"
import { useState } from "react";
import { DndProvider } from "react-dnd";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { AiOutlinePlusCircle } from "react-icons/ai";
import DraggableColumnHeader, { ActivityInfoPart } from "./DraggableColumnHeader";
import ColumnHeaderAction from "./ColumnHeaderAction";
import ColumnHeaderTask from "./ColumnHeaderTask";
import ColumnDataAction from "./ColumnDataAction";
interface TableBasicProps {
    data: ActivityInfo[]
}

const defaultColumns: ColumnDef<ActivityInfoPart>[] = [
    {
        accessorFn: row => row.title,
        id: 'title',
        header: () => (<span className="text-orange-500">Titulo </span>),
        cell: info => info.getValue(),
        enableHiding: false
    },
    {
        accessorFn: row => row.id,
        id: 'id',
        header: 'ID',
        cell: info => info.getValue(),
        enableResizing: true
    },

    {
        accessorFn: row => row.responsible_id,
        id: 'responsible_id',
        header: 'Responsavel',
        cell: info => info.getValue(),

    },
    {
        accessorFn: row => row.progress_status,
        id: 'status',
        header: 'Status',
        cell: info => info.getValue(),
    },
    {
        accessorKey: "action",
        id: 'action',
        header: () => (
            <div className="p-1 flex items-center justify-center font-semibold hover:bg-zinc-400/20 rounded-md bg-transparent ">
                <AiOutlinePlusCircle size={16}></AiOutlinePlusCircle>
            </div>
        ),
        cell: ({ getValue }) => (getValue())
        ,
        enableHiding: false,
        enableResizing: false,
    }

]

const TableBasic: React.FC<TableBasicProps> = ({ data: dataOrigin }) => {

    const [columnVisibility, setColumnVisibility] = useState({})
    const [data, setData] = useState(() => [...dataOrigin.map<ActivityInfoPart>(dataFull => ({
        id: dataFull.id,
        title: dataFull.title,
        responsible_id: dataFull.responsible_id,
        progress_status: dataFull.progress_status
    }))]);

    const [columns] = useState(() => [...defaultColumns])

    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
        columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
    )

    const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')

    const table = useReactTable({
        data,
        columns,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnOrder,
            columnVisibility
        },
        columnResizeMode,
        enableColumnResizing: true,
        onColumnVisibilityChange: setColumnVisibility,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,

    })
    return (

        <div className="p-2 shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
            <DndProvider backend={HTML5Backend} >
                <table
                    {...{
                        style: {
                            width: table.getCenterTotalSize(),
                        },
                    }}
                    className="min-w-full divide-y divide-gray-200 overflow-auto"
                >
                    <thead className="bg-gray-50 justify-end" >
                        {table.getHeaderGroups().map(HeaderGroup => (
                            <tr key={HeaderGroup.id}>
                                {
                                    HeaderGroup.headers.map(header => (
                                        <>

                                            {
                                                !(header.column.id == 'title' || header.column.id == 'action') &&
                                                <DraggableColumnHeader
                                                    key={header.id}
                                                    header={header}
                                                    columnResizeMode="onChange"
                                                    table={table}
                                                />
                                            }
                                            {
                                                (header.column.id == 'title') &&
                                                <ColumnHeaderTask
                                                    key={header.id}
                                                    header={header}
                                                    table={table}
                                                />

                                            }
                                            {
                                                (header.column.id == 'action') &&
                                                <ColumnHeaderAction
                                                    key={header.id}
                                                    header={header}
                                                    table={table}
                                                />
                                            }
                                        </>



                                    ))

                                }
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200" >
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>

                                {row.getVisibleCells().map(cell => {
                                    if (cell.id.includes('action')) {
                                        const id = cell.getContext().getValue()
                                        return (<td
                                            {...{
                                                key: cell.id,
                                                style: {
                                                    width: cell.column.getSize(),
                                                },
                                            }
                                            }
                                            key={cell.id} className="px-6 py-4 "
                                        >
                                            <ColumnDataAction table={table} taskId={row.getAllCells().map(v => { return { ref: v.id, val: v.getValue() } }).find(s => s.ref.includes('_id'))?.val as string} />
                                        </td>)
                                    }


                                    return (
                                        <td

                                            {...{
                                                key: cell.id,
                                                style: {
                                                    width: cell.column.getSize(),
                                                },
                                            }
                                            }
                                            key={cell.id} className="px-6 py-4"
                                        >

                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>

                        ))}
                    </tbody>
                </table>
            </DndProvider>
        </div>

    )
}

export default TableBasic;