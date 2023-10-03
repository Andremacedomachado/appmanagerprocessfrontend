import { UserInfo } from "../UserInfo";

export interface SessionLoginResponseBackend {
    user: UserInfo,
    token: string,
}