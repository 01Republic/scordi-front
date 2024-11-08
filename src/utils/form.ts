export function collectInputs<R = HTMLInputElement>(formElem: EventTarget & HTMLFormElement): R[] {
    return Array.from(formElem.elements).filter((tag) => {
        return ['select', 'textarea', 'input'].includes(tag.tagName.toLowerCase());
    }) as R[];
}
