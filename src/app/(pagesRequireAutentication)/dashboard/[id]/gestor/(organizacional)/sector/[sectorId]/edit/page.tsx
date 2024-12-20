import { FormSectorEdit } from "@/app/components/ui/dashboard/gestor/sector/edit/FormSectorEdit";
import { getAllOrganizations, getSector } from "@/app/lib/data";

export default async function Page({ params: { sectorId } }: { params: { sectorId: string } }) {

    const { data: sector } = await getSector(sectorId);
    const { data: organizations } = await getAllOrganizations()
    if (!sector || !organizations) {
        return
    }
    return (
        <main className="w-full h-full">
            <h1 className="font-serif text-lg text-orange-500 font-semibold">
                Pagina de edição do Setor: {sector.name}
            </h1>

            <FormSectorEdit sector={sector} organizations={organizations} />

        </main>
    )
}