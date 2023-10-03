import Container from "@/app/components/Container";
import MenuViews from "./components/MenuViews";
import MenuListGeneral from "./components/MenuListGeneral";
import CollectionListTask from "./components/CollectionListTask";


const ListViewPage = async () => {

    return (
        <Container>
            <div className="flex flex-col border-2">
                <MenuViews />
                <MenuListGeneral />
                <CollectionListTask />

            </div>
        </Container>
    )
}
export default ListViewPage;