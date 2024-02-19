import {SpyInstance} from './scroll-spy-instance';
import {ScrollSpyOption} from './scroll-spy-option';

export class ScrollSpy {
    option: ScrollSpyOption;
    instances: SpyInstance[];

    constructor(instances: SpyInstance[], option: ScrollSpyOption) {
        this.instances = instances;
    }

    static run(selector: string, option: ScrollSpyOption) {
        const instance = this.init(selector, option);
        instance.run();
    }

    static init(selector: string, option: ScrollSpyOption) {
        const spyElements = Array.from(document.querySelectorAll(selector) as NodeListOf<HTMLElement>);
        const spyInstances = spyElements.map((element) => new SpyInstance(element, option)).filter((ins) => ins.valid);
        return new ScrollSpy(spyInstances, option);
    }

    run() {
        window.addEventListener('scroll', () => {
            this.currentInstance.activate();
        });
    }

    get scrollPassed() {
        return this.instances
            .map((spy, i) => {
                if (!spy) return false;
                spy.deactivate();
                return spy.scrollOver() ? spy : false;
            })
            .filter((e) => e);
    }

    get currentInstance() {
        return this.scrollPassed.reverse()[0] || this.instances[0];
    }
}
