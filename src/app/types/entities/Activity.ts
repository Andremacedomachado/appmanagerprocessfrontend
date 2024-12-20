export enum STATUSACTIVITY {
    DO_TO = "DO_TO",
    CLOSED = "CLOSED"
}

export enum TYPENODE {
    INITIAL = "INITIAL",
    FINALLY = 'FINALLY'
}

export interface IActivityProps {
    id: string,
    title: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
    progress_status?: STATUSACTIVITY,
    due_date?: Date | null,
    start_date?: Date,
    conclusion_date?: Date | null,
    responsible_id: string,
    type_node?: TYPENODE
}