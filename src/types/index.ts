export interface Notes {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNote {
    title: string,
    content: string
}
