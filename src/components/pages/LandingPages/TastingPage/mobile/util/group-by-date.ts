import {GmailItem} from '^api/tasting.api';

export function groupByDate(items: GmailItem[]): Record<string, GmailItem[]> {
    const container: Record<string, GmailItem[]> = {};
    const getDate = (item: GmailItem) => item?.metadata?.date;

    items.forEach((item) => {
        const date = getDate(item);
        container[date?.toISOString()] ||= [];
        container[date?.toISOString()].push(item);
    });

    return container;
}
