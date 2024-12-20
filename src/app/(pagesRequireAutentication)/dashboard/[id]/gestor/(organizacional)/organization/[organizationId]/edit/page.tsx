import { FormOrganizationEdit } from "@/app/components/ui/dashboard/gestor/organization/FormOrganizationEdit";
import { getOrganization } from "@/app/lib/data";

export default async function Page({ params: { organizationId, id } }: { params: { id: string, organizationId: string } }) {
    const { success, data, errors } = await getOrganization(organizationId);
    if (!success || !data) {
        return <div>
            deu error
            <p>
                {errors?.map((error, index) => (
                    <p key={index}> {error.message}</p>
                ))}
            </p>
        </div>
    }
    return (
        <main className="w-full h-full">
            <h1 className="font-semibold text-lg font-serif text-orange-500 ">
                Pagina de edição do setor: {data.name}
            </h1>

            <FormOrganizationEdit organization={data} buttonBack urlBack={`/dashboard/${id}/gestor/organization/`} />

        </main>
    )
}