
import ListingRoles from "./listingRole";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import EmptyState from "../../../components/EmptyState";
import { getUser } from "@/lib/server/actions/userSimple/UserOperationSSR";
import { UserInfo } from "@/app/types/UserInfo";

const Page = async ({ params }: { params: { userId: string } }) => {

    const user = await getUser<UserInfo>({ userId: params.userId })

    if (!user) {
        return (
            <Container>
                <EmptyState showReset />
            </Container>
        )
    }
    return (

        <Container>
            <div className="flex flex-col items-center p-4 shadow-md border-t-2 rounded-md ">

                <div className=" max-w-screen-lg">
                    <Heading
                        title="Listagem de funções:"
                        subtitle="escolha uma dos cargos para começar as atividades.."
                        center
                    />
                    {user.roles && <ListingRoles roles={user.roles} />}
                    {!user.roles && <div>sem cargos</div>
                    }

                </div>

            </div>

        </Container>
    )

}

export default Page;