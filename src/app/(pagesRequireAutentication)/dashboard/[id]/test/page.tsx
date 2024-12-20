


import { getUserInfo } from "@/app/lib/data";
import { ComponentActionTest } from "../../../../../../mocks/ComponentActionTest";

const Page = async ({ params }: { params: { id: string } }) => {
    const userId = params.id
    const user = await getUserInfo(userId)
    /*  const userUpdated = await updateUser({
         id: userId,
         name: "André Macedo Machado 1 "
     })
 
     const userNew = await createUser({
         name: 'joao cardoso',
         email: 'joao123@gmail.com',
         status: 'ACTIVE',
         password: 'Abcd1234',
         organization_sector_id: null
 
     })
     console.log(userNew)
  */
    return (
        <div>
            <div className="gap-1">
                <p id="title_test">User rederizado pelo server:</p>
                {params.id}
                <p>resposta request getUserInfo</p>
                <ComponentActionTest dataOrigin={user} />
                {/*  <p>resposta request updateUser</p>
                <ComponentActionTest dataOrigin={userUpdated} />

                <p>resposta request createUser</p>
                <ComponentActionTest dataOrigin={userNew} />

                <ComponentRequestNested userId={userNew.userid} />
                <SwapperClientTest userId={params.userId} /> */}
            </div>
        </div>
    );
}

export default Page;