import {ClassConstructor} from 'class-transformer';

export class BasicModel<DTO> {
    list: DTO[];

    constructor(list?: DTO[]) {
        this.list = list || [];
    }

    static init<DTO, Model extends BasicModel<DTO>>(this: ClassConstructor<Model>, list?: DTO[]): Model {
        const ModelClass = this;
        return new ModelClass(list);
    }

    /**
     * Essential Methods
     */

    reverse<Model extends BasicModel<DTO>>(this: Model): Model {
        const newList = [...this.list].reverse();
        return this.asManager<Model>(newList);
    }

    filter<Model extends BasicModel<DTO>>(
        this: Model,
        predicate: (value: DTO, index: number, array: DTO[]) => any,
        thisArg?: any,
    ): Model {
        const newList = this.list.filter(predicate, thisArg);
        return this.asManager<Model>(newList);
    }

    sort<Model extends BasicModel<DTO>>(this: Model, compareFn?: (a: DTO, b: DTO) => number): Model {
        const newList = [...this.list].sort(compareFn);
        return this.asManager<Model>(newList);
    }

    sortBy<Model extends BasicModel<DTO>>(
        this: Model,
        attr: {[P in keyof DTO]?: 'ASC' | 'DESC'} | ((a: DTO, b: DTO) => number),
    ): Model {
        function recursive(a: DTO, b: DTO, attrs: (keyof DTO)[], deps: number): number {
            const attr = attrs[0] as keyof DTO;
            const aVal = a[attr] as any;
            const bVal = b[attr] as any;

            return aVal === bVal ? recursive(a, b, attrs, deps + 1) : aVal - bVal;
        }

        const newList = [...this.list].sort((a, b) => {
            if (typeof attr === 'function') {
                return attr(a, b);
            } else {
                const attrs = Object.keys(attr) as (keyof DTO)[];
                return recursive(a, b, attrs, 0);
            }
        });

        return this.asManager<Model>(newList);
    }

    unique<Model extends BasicModel<DTO>>(this: Model, attr?: keyof DTO | ((record: DTO) => any)): Model {
        if (attr) {
            const seen: any[] = [];
            return this.filter<Model>((record) => {
                const val = typeof attr === 'function' ? attr(record) : record[attr];
                return seen.indexOf(val) >= 0 ? false : seen.push(val);
            });
        } else {
            return this.filter<Model>((d, i, arr) => arr.indexOf(d) === i);
        }
    }

    first<Model extends BasicModel<DTO>>(this: Model, count: number): Model {
        return this.filter<Model>((_, i) => i < count);
    }

    last<Model extends BasicModel<DTO>>(this: Model, count: number): Model {
        return this.reverse<Model>().first<Model>(count);
    }

    /**
     * Final Methods (returning non-chainable value)
     */

    all = () => this.list;
    toArray = () => this.all();
    take = (index = 0) => this.list[index];

    get length() {
        return this.list.length;
    }

    map<R>(predicate: (value: DTO, index: number, array: DTO[]) => R, thisArg?: any) {
        const newList = this.list.filter(predicate, thisArg);
        return this.list.map(predicate, thisArg);
    }

    attrMap<Model extends BasicModel<DTO>, K extends keyof DTO>(this: Model, attr: K): DTO[K][] {
        return this.list.map((d) => d[attr]);
    }

    attrSum<Model extends BasicModel<DTO>, K extends keyof DTO>(this: Model, attr: K): number {
        const nums = this.attrMap<Model, K>(attr) as number[];
        return nums.reduce((acc, a) => acc + a, 0);
    }

    /**
     * Private Methods
     */

    protected asManager<Model extends BasicModel<DTO>>(this: Model, newList: DTO[]): Model {
        const ModelClass = this.constructor as ClassConstructor<Model>;
        return new ModelClass(newList);
    }
}
