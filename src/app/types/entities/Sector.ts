export interface ISectorProps {
    id: string,
    name: string,
    created_at?: Date,
    updated_at?: Date,
    employeesAllocated: number,
    organization_id: string
}