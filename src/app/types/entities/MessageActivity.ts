
export enum TYPEMESSAGE {
    SYSTEM = 'SYSTEM',
    USER = 'USER'
}

export interface IMessageActivityProps {
    content: string,
    publication_date: Date,
    updated_at?: Date,
    type_message: TYPEMESSAGE,
    user_id: string,
    activity_id: string
}