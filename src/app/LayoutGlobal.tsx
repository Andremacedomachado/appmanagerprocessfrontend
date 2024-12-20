
import LoginModal from "./components/modals/LoginModal"
import RegisterModal from "./components/modals/RegisterModal"
import NavBar from "./components/navbar/NavBar"
import ToasterProvider from "./providers/ToasterProvider"

export interface LayuotGlobalProps {
    children: React.ReactNode
}

export const LayoutGlobal = ({ children }: LayuotGlobalProps) => {
    return (

        <>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <NavBar />
            <div className="pt-28 overflow-hidden">
                {children}
            </div>
        </>

    )
}