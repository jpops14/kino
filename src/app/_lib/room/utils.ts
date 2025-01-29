export const getRoomCapacity = (layout: string) => {
    const parsedLayout = JSON && JSON.parse(layout);
    return parsedLayout.reduce((acc: number, row: string[]) => {
        return acc + row.filter((seat) => seat !== '*').length;
    }, 0);
}