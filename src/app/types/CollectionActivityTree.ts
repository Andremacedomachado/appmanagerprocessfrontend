export type ActivityInfo = {
    id: string;
    title: string;
    description: string;
    responsible_id: string;
    progress_status: string;
    type_node: string | null;
    created_at: Date;
    updated_at: Date;
    start_date?: Date | undefined;
    due_date?: Date | undefined;
}

export type Collaborator = {
    user_id: string,
    activity_id: string,
}

export type ActivityTree = {
    activities: ActivityInfo[];
    collaborators: Collaborator[];
}

export type CollectionActivityTree = {
    collectionsActivityTree: ActivityTree[];
}