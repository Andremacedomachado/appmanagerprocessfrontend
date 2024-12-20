interface SummaryProps<T extends object, K extends keyof T> {
    data: T;
    property: K;
}

export const Summary = <T extends object, K extends keyof T>({
    data,
    property,
}: SummaryProps<T, K>) => {
    const value = data[property] as string;

    return (
        <div>
            {(typeof property === "string") ? (
                <p>
                    {property}: {value}{" "}
                </p>
            ) : (
                ""
            )}
        </div>
    );
}