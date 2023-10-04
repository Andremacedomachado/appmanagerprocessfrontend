import ButtonRedirect from "@/app/components/ButtonRedirect";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

const UserDashBoardPage = async ({ params }: { params: { userId: string } }) => {
    return (
        <Container>
            <div
                className="p-2 bg-transparent bg-opacity-10 shadow-md"
            >
                <Heading title="Listagem suas atividades" subtitle="todas as atividades são organizadas por processos e atividades especificas" />
                <ButtonRedirect label="atividades" endPoint={'/v/li'} />
            </div>
        </Container>
    )
}

export default UserDashBoardPage;