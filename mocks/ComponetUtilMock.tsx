export type ComponentMockProps<T> = {
    handler: () => T
    title: string
}
export const ComponentMock = <T extends Object>({ title, handler }: ComponentMockProps<T>) => {
    const res = handler()
    return (
        <div>
            {res.toString()}
        </div>
    )
}