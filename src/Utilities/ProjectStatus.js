// @flow

const StatusArray = ["completed", "ongoing", "aborted", "on hold"];

export const StatusToString = (status: number): string => {
    if (status < 0 || status >= StatusArray.length)
        return StatusArray[1];
    return StatusArray[status]
};

export const StringToStatus = (str: string): number => {
    const idx = StatusArray.indexOf(str);
    if (idx === -1)
        return "ongoing";
    return idx
};
