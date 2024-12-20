import { Session } from 'next-auth/core/types';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { userMock } from './entitiesMock';

type UtilTypeRecordAny<T> = {
    [P in keyof T]: T[any]
}

type SessionProviderPropsOfAny = UtilTypeRecordAny<SessionProviderProps>
const createSession = (params: Partial<SessionProviderProps>) => ({
    basePath: cy.stub().as('basePath'),
    baseUrl: cy.stub((age: string) => age).as('basePath'),
    session: cy.stub(() => ({
        user: {
            image: undefined,
            ...userMock
        },
        expires: ''
    } as Session)).as('session'),
    refetchOnWindowFocus: cy.stub(false).as('refetchOnWindowFocus'),
    refetchWhenOffline: cy.stub(false).as('refetchWhenOffline'),
    refetchInterval: cy.stub(300).as('refetchInterval'),

} as SessionProviderPropsOfAny)

interface MockNextRouterProps extends Partial<SessionProviderProps> {
    children: React.ReactNode
}

const MockedSessionNextAuth = ({ children, ...props }: MockNextRouterProps) => {
    const router = createSession(props as SessionProviderProps)

    const propsOverwrite: SessionProviderProps = { ...router, ...props }

    return (
        <SessionProvider session={undefined}>
            {children}
        </SessionProvider>
    )
}

export default MockedSessionNextAuth