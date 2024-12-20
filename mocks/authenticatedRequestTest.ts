import { SessionLoginResponseBackend } from "@/app/types/entities/Session";
import checkAuthenticated from "@/app/lib/auth/authenticatedUtilsSSR";
import { User } from "next-auth";
import { Method, RouteMatcher } from "cypress/types/net-stubbing";

export const loginOperationMock = async () => {
    const contentPayload = {
        email: 'andre@gmail.com',
        password: '1234'
    }
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contentPayload)
    })
    const user: SessionLoginResponseBackend = await res.json();
    if (res.ok && user) {
        const userInFormat: User = {
            ...user.user,
            access_token: user.token
        }
        return userInFormat;
    }
    return null;
}

export const checkAuthenticatedOnRequestMock = (user: User | null) => {
    const token = user ? `Bearer ${user.access_token}` : null
    const header = new Headers()
    header.append('Content-Type', 'application/json')

    if (token)
        header.append('Authorization', token)

    const stubWithImplementation = cy.stub(checkAuthenticated, 'checkAuthenticatedOnRequest').resolves(() => (header as Headers))
    return stubWithImplementation

}


export const checkAuthenticatedOnRequestIntercept = (user: User | null, method: Method, route: RouteMatcher) => {
    cy.intercept(method, route, (req) => {
        console.log('INTERCEPT', req)
        const token = user ? `Bearer ${user.access_token}` : null
        if (token) {
            req.headers = {
                ...req.headers,
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        req.continue()
    }).as('intercept_rbk')

    cy.wait('@intercept_rbk')
}