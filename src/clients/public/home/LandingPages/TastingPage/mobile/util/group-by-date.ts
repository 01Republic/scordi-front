export function groupByDate<T>(items: T[], getDate: (item: T) => Date): Record<string, T[]> {
    const container: Record<string, T[]> = {};
    // const getDate = (item: GmailItem) => item?.metadata?.date;

    items.forEach((item) => {
        const date = getDate(item);
        container[date.toISOString()] ||= [];
        container[date.toISOString()].push(item);
    });

    return container;
}
