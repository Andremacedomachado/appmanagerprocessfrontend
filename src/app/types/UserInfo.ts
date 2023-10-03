export type RoleFormatInUser = {
    roleName: string,
    roleId: string,
    adjusterI: string,
    dateLinkRole: Date
}

export interface UserInfo {

    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    status: string,
    organization_linked: {
        dateLinkSector: Date,
        organizationId: string,
        organizationName: string
    },
    roles: RoleFormatInUser[]
} 