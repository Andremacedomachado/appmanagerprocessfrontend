import { ButtonPushInfoUser } from "@/app/components/ui/dashboard/gestor/activity/Button";
import { SearchTable } from "@/app/components/ui/dashboard/gestor/activity/SearchTable";
import { Button } from "@/app/components/ui/dashboard/gestor/layout/Buttons";
import { Table } from "@/app/components/ui/table/Table";
import { getManyUser } from "@/app/lib/data";
import { da } from "date-fns/locale";
import Link from "next/link";
import { string } from "zod";

export default async function Page({ params: id, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const fields =
        Array.isArray(searchParams.keys) ? searchParams.keys : ['name', 'email']
    const value =
        typeof searchParams.value === 'string' ? searchParams.value : ''

    const { data, success, errors } = await getManyUser({ query: { keys: fields, value } })
    if (errors) {
        console.log(errors)
    }
    if (!data) return null
    const contentsHead = [['nome', 'email', 'status', 'ações']]
    const contentsBody = data.map(user => ([user.name, user.email, user.status, <ButtonPushInfoUser key={user.id} id={user.id} />]))

    return (
        <main className="h-full  w-full">
            <h1>algo pagina de gerenciaento deatividades de usuarios</h1>
            <SearchTable search={value} fields={fields} />

            <Table contentsHead={contentsHead} contentsBody={contentsBody} />
        </main>
    )
}