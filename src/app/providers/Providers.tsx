

import React, { ReactNode } from 'react';
import { auth } from '../../../auth';
import { SessionProvider } from 'next-auth/react';



interface Props {
    children: ReactNode
}

export async function Providers({ children }: Props) {
    const session = await auth();
    return <SessionProvider session={session} >{children}</SessionProvider>
}

