import {ScrollSpyOption} from './scroll-spy-option';

export class SpyInstance {
    element: HTMLElement;
    target: Element;
    valid: boolean;
    option: ScrollSpyOption;

    constructor(element: HTMLElement, option: ScrollSpyOption) {
        this.element = element;
        this.option = option;

        const targetSelector = element.dataset.spyTarget;
        if (!targetSelector) {
            this.valid = false;
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            this.valid = false;
            return;
        }

        this.valid = true;
        this.target = target;
    }

    activate() {
        this.element.classList.add(this.activeClass);
    }

    deactivate() {
        this.element.classList.remove(this.activeClass);
    }

    scrollOver() {
        const rect = this.target.getBoundingClientRect();
        return rect.top <= 0;
    }

    private get activeClass() {
        return this.option.activeClass;
    }
}
