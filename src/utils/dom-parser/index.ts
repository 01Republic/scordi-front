export function parseHTML(html: string) {
    return new DOMParser().parseFromString(html, 'text/html');
}

export function querySelectorXPath(html: string, selector: string, throwErr = false) {
    const getNode = () => {
        const doc = parseHTML(html);
        const {FIRST_ORDERED_NODE_TYPE} = XPathResult;
        const result = doc.evaluate(selector, doc, null, FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    };

    if (throwErr) return getNode();

    try {
        return getNode();
    } catch (e) {
        return null;
    }
}

export function getMatchResultForHtml(dataSource: string, inputValue: string) {
    if (!inputValue) return '';

    try {
        const nodeValue = querySelectorXPath(dataSource, inputValue, true);

        if (!nodeValue) return '';
        if (nodeValue instanceof Text) return nodeValue.nodeValue || '';
        if (nodeValue instanceof HTMLElement) return nodeValue.outerHTML || '';

        return nodeValue.nodeValue || '';
    } catch (e: any) {
        return e.message as string;
    }
}
