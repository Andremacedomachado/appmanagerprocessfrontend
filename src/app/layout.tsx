import './globals.css'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import ToasterProvider from './providers/ToasterProvider'
import Providers from './providers/Providers'
import NavBar from './components/navbar/NavBar'

export const metadata = {
    title: 'App manager project',
    description: 'aplicação para monitoramento de atividades publicas',
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { userId: string }
}) {

    return (
        <html lang="pt-br">
            <body>
                <Providers>
                    <ToasterProvider />
                    <LoginModal />
                    <RegisterModal />
                    <NavBar />
                    {/* <Modal actionLabel='Submit' secondaryActionLabel='Back' isOpen title='Hello world' /> */}
                    <div className="pt-28 overflow-hidden">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
