
export function formatPathToEndPoint(pathName: string, delimiter: string) {
    return delimiter + pathName.split(delimiter)[1].replaceAll('\\', '/')
}