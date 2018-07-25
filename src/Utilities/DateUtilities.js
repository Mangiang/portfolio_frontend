// @flow


function padStr(str: string, size: number): string {
    while (str.length < size) str = "0" + str;
    return str;
}

export const format = (date: Date): string => {
    let day = padStr(date.getDate().toString(), 2);
    let month = padStr(date.getMonth().toString(), 2);
    let year = date.getFullYear();

    return [day, month, year].join("-");
};