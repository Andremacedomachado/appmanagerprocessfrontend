import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { auth } from '../../auth'

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

    const session = await auth();

    return (
        <html lang="pt-br">
            <body >
                <SessionProvider session={session} >{children}</SessionProvider>
            </body>
        </html>
    )
}
