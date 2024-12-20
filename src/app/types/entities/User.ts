import { USERSTATUS } from "../UserInfo";

export type IUserProps = {
    id: string,
    name: string,
    email: string,
    status: USERSTATUS,
    created_at?: Date,
    updated_at?: Date,
    organization_sector_id: string | null,
}

