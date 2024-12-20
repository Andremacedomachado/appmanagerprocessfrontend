
export function formatPathToEndPoint(pathName: string, delimiter: string) {
    return delimiter + pathName.split(delimiter)[1].replaceAll('\\', '/')
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}