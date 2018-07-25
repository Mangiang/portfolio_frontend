// @flow


function padStr(str: string, size: number): string {
    while (str.length < size) str = "0" + str;
    return str;
}

export const format = (date: Date): string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (date.getTime() === (new Date(0).getTime())) {
        return "Work in progress";
    }
    let day = padStr(date.getDate().toString(), 2);
    let year = date.getFullYear();

    return `${day}th ${months[date.getMonth() - 1]} ${year}`;
};