export type RoleFormatInUser = {
    roleName: string,
    roleId: string,
    adjusterId: string,
    dateLinkRole: Date
}

export interface UserInfo {

    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    status: USERSTATUS,
    organization_linked: {
        dateLinkSector: Date,
        organizationId: string,
        organizationName: string
    },
    roles: RoleFormatInUser[]
}

export enum USERSTATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}